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

    // 替换品牌名称为通用「品牌方」
    cleaned = this.replaceBrandNames(cleaned);

    // 替换具体的业务提示文本
    cleaned = cleaned.replace(
      /恭喜！已解锁 0\.75 倍会员时长.*?～/g,
      '这是一个成功提示消息'
    );

    // 替换会员活动内容
    if (cleaned.includes('会员服务好内容') || cleaned.includes('客服')) {
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

    // 替换复杂的活动规则富文本内容
    if (cleaned.includes('活动规则') && cleaned.includes('免责声明')) {
      cleaned = cleaned.replace(
        /const content = `<p>.*?<\/ul>/gs,
        `const content = \`<p>这是一个示例活动规则。</p>
<h3>活动说明</h3>
<ul>
  <li>活动期间，用户可以参与相关活动</li>
  <li>每个用户账号仅可享受一次优惠</li>
  <li>活动最终解释权归主办方所有</li>
</ul>\``
      );
    }

    // 替换重复的协议内容
    if (cleaned.includes('会员服务会员狂欢节')) {
      // 匹配重复的协议文本内容
      const repeatedText = /欢迎你（以下简称「你」或「用户」）参与由品牌方、品牌方发起的「会员服务会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。/g;
      
      // 先统计重复次数
      const matches = cleaned.match(repeatedText);
      if (matches && matches.length > 1) {
        // 替换所有重复内容为简洁的示例文本
        cleaned = cleaned.replace(
          /欢迎你（以下简称「你」或「用户」）参与由品牌方、品牌方发起的「会员服务会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。(\s*欢迎你（以下简称「你」或「用户」）参与由品牌方、品牌方发起的「会员服务会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。)*/g,
          '这是一个示例协议内容，用于展示弹窗的滚动效果。在实际使用中，这里会显示具体的用户协议或服务条款内容。'
        );
      }
    }

    return cleaned;
  }

  /**
   * 替换品牌名称为通用术语
   * @param content 内容
   * @returns 清理后的内容
   */
  private static replaceBrandNames(content: string): string {
    let cleaned = content;

    // 替换知乎为品牌方
    cleaned = cleaned.replace(/知乎/g, '品牌方');
    
    // 替换盐言故事为品牌方
    cleaned = cleaned.replace(/盐言故事/g, '品牌方');
    
    // 替换盐选为会员服务
    cleaned = cleaned.replace(/盐选/g, '会员服务');
    
    // 替换具体的颜色描述
    cleaned = cleaned.replace(/知乎蓝|品牌方蓝/g, '主题色');
    cleaned = cleaned.replace(/VIP 会员色/g, '会员色');
    
    // 替换小管家为客服
    cleaned = cleaned.replace(/知乎小管家|小管家/g, '客服');

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
