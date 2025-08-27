/**
 * 敏感信息清理工具类
 */
export class SensitiveUtils {
  /**
   * 清理敏感信息
   * @param content markdown 内容
   * @returns 清理后的内容
   */
  static cleanSensitiveInfo(content: string): string {
    let cleanedContent = content;

    // 1. 移除ZH内部链接和参考文档
    cleanedContent = this.removeInternalLinks(cleanedContent);

    // 2. 替换ZH特定的业务内容
    cleanedContent = this.replaceBizContent(cleanedContent);

    // 3. 移除或替换ZH内部依赖
    cleanedContent = this.replaceInternalDependencies(cleanedContent);

    return cleanedContent;
  }

  /**
   * 移除ZH内部链接
   * @param content 内容
   * @returns 清理后的内容
   */
  private static removeInternalLinks(content: string): string {
    let cleaned = content;

    // 移除参考文档部分（包含内部链接）
    const refDocRegex = /^### 参考文档[\s\S]*?(?=^##|^$)/gm;
    cleaned = cleaned.replace(refDocRegex, '');

    // 移除单独的设计稿链接行
    const designLinkRegex = /^- 设计稿：.*$/gm;
    cleaned = cleaned.replace(designLinkRegex, '');

    // 移除颜色系统链接行
    const colorLinkRegex = /^- 颜色系统：.*$/gm;
    cleaned = cleaned.replace(colorLinkRegex, '');

    // 移除ZH端内推荐说明
    const hybridRegex = /ZH端内推荐优先使用.*?实现简单顶部导航。/g;
    cleaned = cleaned.replace(hybridRegex, '');

    // 移除外部ZH链接
    const zhihuLinkRegex = /href=['"]https:\/\/www\.zhihu\.com['"]/g;
    cleaned = cleaned.replace(zhihuLinkRegex, 'href="https://example.com"');

    // 移除设计规范链接
    const designRegex = /\[设计规范\].*?(?=，|。|\n)/g;
    cleaned = cleaned.replace(designRegex, '');

    // 移除多余的空行
    cleaned = cleaned.replace(/\n\n\n+/g, '\n\n');

    return cleaned;
  }

  /**
   * 替换业务相关内容
   * @param content 内容
   * @returns 清理后的内容
   */
  private static replaceBizContent(content: string): string {
    let cleaned = content;

    // 替换具体的业务提示文本
    cleaned = cleaned.replace(
      /恭喜！已解锁 0\.75 倍会员时长.*?～/g,
      '这是一个成功提示消息'
    );

    // 替换ZH盐选会员活动内容
    if (cleaned.includes('盐选好内容') || cleaned.includes('ZH小管家')) {
      cleaned = cleaned.replace(
        /const content = `.*?`/gs,
        `const content = \`<p>这是一个富文本内容示例。</p>
<h2>标题示例</h2>
<ul>
  <li>列表项 1</li>
  <li>列表项 2</li>
  <li>列表项 3</li>
</ul>\``
      );
    }

    return cleaned;
  }

  /**
   * 替换内部依赖
   * @param content 内容
   * @returns 清理后的内容
   */
  private static replaceInternalDependencies(content: string): string {
    let cleaned = content;

    // 替换ZH内部图标库引用
    cleaned = cleaned.replace(
      /import \{ ([^}]+) \} from '@zhihu\/design-icons'/g,
      "// 注意：需要替换为你项目中的图标库\n// import { $1 } from 'your-icon-library'"
    );

    // 替换ZH静态资源链接
    cleaned = cleaned.replace(
      /https:\/\/static\.zhihu\.com\/[^\s'"]+/g,
      'https://example.com/your-static-resource.pag'
    );

    // 替换内部文档链接描述
    cleaned = cleaned.replace(
      /语义化的矢量图形，实际引用的图标库为：.*?dependencies`。/gs,
      '语义化的矢量图形，请根据项目需要选择合适的图标库。'
    );

    return cleaned;
  }
}
