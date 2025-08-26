/**
 * 文档处理器接口定义
 */
export interface IDocProcessor {
  /**
   * 处理器名称
   */
  name: string;

  /**
   * 处理文档
   * @param options 处理选项
   */
  process(options?: ProcessOptions): Promise<void>;
}

/**
 * 处理选项接口
 */
export interface ProcessOptions {
  /**
   * 源目录路径
   */
  sourceDir?: string;
  
  /**
   * 目标目录路径
   */
  targetDir?: string;
  
  /**
   * 是否启用调试模式
   */
  debug?: boolean;
  
  /**
   * 其他自定义选项
   */
  [key: string]: any;
}

/**
 * 代码片段信息
 */
export interface CodeSnippet {
  /**
   * 文件路径
   */
  filePath: string;
  
  /**
   * 代码内容
   */
  content: string;
  
  /**
   * 语言类型
   */
  language: string;
}

/**
 * 组件信息
 */
export interface ComponentInfo {
  /**
   * 组件名称
   */
  name: string;
  
  /**
   * 组件目录路径
   */
  path: string;
  
  /**
   * README 文件路径
   */
  readmePath: string;
  
  /**
   * demos 目录路径
   */
  demosPath: string;
  
  /**
   * 是否有 demos 目录
   */
  hasDemos: boolean;
}
