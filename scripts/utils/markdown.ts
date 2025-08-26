import { FileUtils } from './file.js';
import { SensitiveUtils } from './sensitive.js';
import { CodeSnippet } from '../types/index.js';

/**
 * Markdown 处理工具类
 */
export class MarkdownUtils {
  /**
   * 从 markdown 内容中提取 code 标签
   * @param content markdown 内容
   * @returns code 标签信息数组
   */
  static extractCodeTags(content: string): Array<{ src: string; fullMatch: string }> {
    // 修复正则表达式：支持自闭合标签和普通标签两种形式
    // 原因：原始正则只匹配 <code src="..."></code> 格式，但实际文档中存在自闭合标签
    // 匹配 <code src="..." ...> 或 <code src="..." ...></code> 或 <code src="..." ... />
    const codeTagRegex = /<code\s+[^>]*src=["']([^"']+)["'][^>]*(?:\/>|><\/code>|>)/g;
    const matches: Array<{ src: string; fullMatch: string }> = [];
    
    let match;
    while ((match = codeTagRegex.exec(content)) !== null) {
      matches.push({
        src: match[1],
        fullMatch: match[0]
      });
    }
    
    return matches;
  }

  /**
   * 读取代码文件并返回代码片段信息
   * @param codeFilePath 代码文件路径
   * @param basePath 基础路径，用于解析相对路径
   * @returns 代码片段信息
   */
  static async readCodeSnippet(codeFilePath: string, basePath: string): Promise<CodeSnippet | null> {
    try {
      // 处理相对路径
      const path = await import('path');
      let fullPath = codeFilePath.startsWith('./') || codeFilePath.startsWith('../')
        ? path.resolve(basePath, codeFilePath)
        : codeFilePath;

      // 如果文件不存在，尝试添加常见的扩展名
      // 原因：部分 code 标签的 src 路径没有文件扩展名（如 ./demos/cyclicRoll）
      if (!(await FileUtils.exists(fullPath))) {
        const extensions = ['.tsx', '.ts', '.jsx', '.js'];
        let found = false;
        
        for (const ext of extensions) {
          const pathWithExt = fullPath + ext;
          if (await FileUtils.exists(pathWithExt)) {
            fullPath = pathWithExt;
            found = true;
            break;
          }
        }
        
        if (!found) {
          console.warn(`代码文件不存在: ${fullPath} (已尝试扩展名: ${extensions.join(', ')})`);
          return null;
        }
      }

      const content = await FileUtils.readFile(fullPath);
      const extension = FileUtils.getExtension(fullPath);
      
      // 根据文件扩展名确定语言类型
      const language = this.getLanguageFromExtension(extension);

      return {
        filePath: fullPath,
        content: content.trim(),
        language
      };
    } catch (error) {
      console.error(`读取代码文件失败: ${codeFilePath}`, error);
      return null;
    }
  }

  /**
   * 根据文件扩展名获取语言类型
   * @param extension 文件扩展名
   * @returns 语言类型
   */
  private static getLanguageFromExtension(extension: string): string {
    const languageMap: Record<string, string> = {
      '.ts': 'typescript',
      '.tsx': 'tsx',
      '.js': 'javascript',
      '.jsx': 'jsx',
      '.vue': 'vue',
      '.css': 'css',
      '.less': 'less',
      '.scss': 'scss',
      '.sass': 'sass',
      '.html': 'html',
      '.json': 'json',
      '.md': 'markdown'
    };

    return languageMap[extension.toLowerCase()] || 'text';
  }

  /**
   * 将代码片段转换为 markdown 代码块
   * @param codeSnippet 代码片段
   * @returns markdown 代码块
   */
  static codeSnippetToMarkdown(codeSnippet: CodeSnippet): string {
    return `\`\`\`${codeSnippet.language}\n${codeSnippet.content}\n\`\`\``;
  }

  /**
   * 替换 markdown 内容中的 code 标签为实际代码
   * @param content markdown 内容
   * @param basePath 基础路径，用于解析相对路径
   * @returns 处理后的 markdown 内容
   */
  static async replaceCodeTags(content: string, basePath: string): Promise<string> {
    const codeTags = this.extractCodeTags(content);
    let processedContent = content;

    for (const codeTag of codeTags) {
      const codeSnippet = await this.readCodeSnippet(codeTag.src, basePath);
      
      if (codeSnippet) {
        const markdownCode = this.codeSnippetToMarkdown(codeSnippet);
        processedContent = processedContent.replace(codeTag.fullMatch, markdownCode);
      } else {
        // 如果无法读取代码文件，保留原始标签并添加注释
        const warningComment = `<!-- 警告: 无法读取代码文件 ${codeTag.src} -->`;
        processedContent = processedContent.replace(codeTag.fullMatch, `${warningComment}\n${codeTag.fullMatch}`);
      }
    }

    return processedContent;
  }

  /**
   * 移除更新日志部分
   * @param content markdown 内容
   * @returns 处理后的内容
   */
  static removeChangelog(content: string): string {
    // 匹配 "## 更新日志" 标题及其后面的所有内容
    // 原因：部分文档没有 "## 更新日志" 标题，直接以 "### 贡献者" 开始
    // 也匹配 "### 贡献者" 和 "### 迭代记录" 等相关内容
    const changelogRegex = /^(## 更新日志|### 贡献者|### 迭代记录)[\s\S]*$/m;
    let processedContent = content.replace(changelogRegex, '').trim();
    
    // 如果还有遗留的贡献者或迭代记录部分，再次清理
    // 确保完全移除所有更新日志相关内容
    const contributorRegex = /^### 贡献者[\s\S]*$/m;
    processedContent = processedContent.replace(contributorRegex, '').trim();
    
    const iterationRegex = /^### 迭代记录[\s\S]*$/m;
    processedContent = processedContent.replace(iterationRegex, '').trim();
    
    return processedContent;
  }

  /**
   * 从 markdown 内容中提取标题
   * @param content markdown 内容
   * @returns 标题，如果找不到则返回空字符串
   */
  static extractTitle(content: string): string {
    const titleMatch = content.match(/^# (.+)$/m);
    return titleMatch ? titleMatch[1].trim() : '';
  }

  /**
   * 处理 markdown 内容
   * @param content 原始内容
   * @param basePath 基础路径
   * @param cleanSensitive 是否清理敏感信息
   * @returns 处理后的内容
   */
  static async processMarkdown(content: string, basePath: string, cleanSensitive = false): Promise<string> {
    let processedContent = content;
    
    // 1. 替换 code 标签
    processedContent = await this.replaceCodeTags(processedContent, basePath);
    
    // 2. 移除更新日志
    processedContent = this.removeChangelog(processedContent);
    
    // 3. 清理敏感信息（如果需要）
    if (cleanSensitive) {
      processedContent = SensitiveUtils.cleanSensitiveInfo(processedContent);
    }
    
    return processedContent;
  }
}
