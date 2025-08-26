import * as path from 'path';
import { IDocProcessor, ProcessOptions, ComponentInfo } from '../types/index.js';
import { FileUtils, MarkdownUtils } from '../utils/index.js';
import { MIXUI_CONFIG } from '../config/index.js';

/**
 * Mix-UI 文档处理器
 * 负责处理 Mix-UI 组件库的文档复制和转换
 */
export class MixUIProcessor implements IDocProcessor {
  public readonly name = 'mixui';

  /**
   * 默认配置
   */
  private readonly defaultOptions = {
    sourceDir: MIXUI_CONFIG.DEFAULT_SOURCE_DIR,
    targetDir: MIXUI_CONFIG.DEFAULT_TARGET_DIR,
    debug: false
  };

  /**
   * 处理文档
   * @param options 处理选项
   */
  async process(options: ProcessOptions = {}): Promise<void> {
    const config = { ...this.defaultOptions, ...options };
    
    this.log('开始处理 Mix-UI 文档...', config.debug);
    this.log(`源目录: ${config.sourceDir}`, config.debug);
    this.log(`目标目录: ${config.targetDir}`, config.debug);

    try {
      // 1. 扫描所有组件
      const components = await this.scanComponents(config.sourceDir);
      this.log(`找到 ${components.length} 个组件`, config.debug);

      // 2. 过滤有 demos 目录的组件
      const componentsWithDemos = components.filter(comp => comp.hasDemos);
      this.log(`其中 ${componentsWithDemos.length} 个组件有 demos 目录`, config.debug);

      // 3. 确保目标目录存在
      await FileUtils.ensureDir(config.targetDir);

      // 4. 处理每个组件
      let processedCount = 0;
      for (const component of componentsWithDemos) {
        try {
          await this.processComponent(component, config.targetDir, config.debug);
          processedCount++;
          this.log(`✓ 已处理组件: ${component.name}`, config.debug);
        } catch (error) {
          console.error(`✗ 处理组件失败: ${component.name}`, error);
        }
      }

      console.log(`\n🎉 Mix-UI 文档处理完成!`);
      console.log(`📊 总计处理: ${processedCount}/${componentsWithDemos.length} 个组件`);
      console.log(`📁 输出目录: ${path.resolve(config.targetDir)}`);

    } catch (error) {
      console.error('处理 Mix-UI 文档时发生错误:', error);
      throw error;
    }
  }

  /**
   * 扫描所有组件
   * @param sourceDir 源目录
   * @returns 组件信息数组
   */
  private async scanComponents(sourceDir: string): Promise<ComponentInfo[]> {
    const components: ComponentInfo[] = [];
    
    if (!(await FileUtils.exists(sourceDir))) {
      throw new Error(`源目录不存在: ${sourceDir}`);
    }

    const entries = await FileUtils.readDir(sourceDir);
    
    for (const entry of entries) {
      const componentPath = path.join(sourceDir, entry);
      
      if (await FileUtils.isDirectory(componentPath)) {
        const readmePath = path.join(componentPath, 'README.md');
        const demosPath = path.join(componentPath, 'demos');
        
        // 检查是否有 README.md 文件
        const hasReadme = await FileUtils.exists(readmePath);
        // 检查是否有 demos 目录
        const hasDemos = await FileUtils.isDirectory(demosPath);
        
        if (hasReadme) {
          components.push({
            name: entry,
            path: componentPath,
            readmePath,
            demosPath,
            hasDemos
          });
        }
      }
    }

    return components;
  }

  /**
   * 处理单个组件
   * @param component 组件信息
   * @param targetDir 目标目录
   * @param debug 是否启用调试
   */
  private async processComponent(component: ComponentInfo, targetDir: string, debug: boolean): Promise<void> {
    this.log(`处理组件: ${component.name}`, debug);

    // 1. 读取 README.md 内容
    const readmeContent = await FileUtils.readFile(component.readmePath);
    
    // 2. 提取标题作为文件名
    const title = MarkdownUtils.extractTitle(readmeContent);
    const filename = this.generateSafeFilename(title || component.name);
    
    this.log(`  - 标题: ${title}`, debug);
    this.log(`  - 文件名: ${filename}`, debug);

    // 3. 处理 markdown 内容
    const processedContent = await MarkdownUtils.processMarkdown(
      readmeContent, 
      component.path,
      MIXUI_CONFIG.CLEAN_SENSITIVE // 根据配置决定是否启用敏感信息清理
    );

    // 4. 写入目标文件
    const outputPath = path.join(targetDir, filename);
    await FileUtils.writeFile(outputPath, processedContent);
    
    this.log(`  - 输出路径: ${outputPath}`, debug);
  }

  /**
   * 生成安全的文件名
   * @param title 标题
   * @returns 安全的文件名
   */
  private generateSafeFilename(title: string): string {
    // 清理标题中的特殊字符，生成安全的文件名
    let safeTitle = FileUtils.sanitizeFilename(title, '-');
    
    // 确保以 .md 结尾
    if (!safeTitle.endsWith('.md')) {
      safeTitle += '.md';
    }
    
    return safeTitle;
  }

  /**
   * 日志输出
   * @param message 消息
   * @param debug 是否启用调试
   */
  private log(message: string, debug: boolean): void {
    if (debug) {
      console.log(message);
    }
  }
}
