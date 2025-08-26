/**
 * 全局配置文件
 */

/**
 * Mix-UI 处理器配置
 */
export const MIXUI_CONFIG = {
  /**
   * 源组件库包名
   */
  PACKAGE_NAME: '@kfe/mix-ui',
  
  /**
   * 默认源目录路径
   */
  DEFAULT_SOURCE_DIR: 'node_modules/@kfe/mix-ui/src/components',
  
  /**
   * 默认目标目录路径
   */
  DEFAULT_TARGET_DIR: 'docs/mix-ui',
  
  /**
   * 是否启用敏感信息清理
   * 开源版本默认启用，可通过环境变量 CLEAN_SENSITIVE=false 关闭
   */
  CLEAN_SENSITIVE: process.env.CLEAN_SENSITIVE !== 'false',
};

/**
 * 通用配置
 */
export const GENERAL_CONFIG = {
  /**
   * 默认编码格式
   */
  DEFAULT_ENCODING: 'utf-8' as BufferEncoding,
  
  /**
   * 支持的代码文件扩展名
   */
  CODE_EXTENSIONS: ['.tsx', '.ts', '.jsx', '.js'],
};
