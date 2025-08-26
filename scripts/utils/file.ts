import * as fs from 'fs/promises';
import * as path from 'path';
import sanitize from 'sanitize-filename';

/**
 * 文件操作工具类
 */
export class FileUtils {
  /**
   * 检查文件是否存在
   * @param filePath 文件路径
   * @returns 文件是否存在
   */
  static async exists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 确保目录存在，如果不存在则创建
   * @param dirPath 目录路径
   */
  static async ensureDir(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      // 如果目录已存在，忽略错误
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error;
      }
    }
  }

  /**
   * 读取文件内容
   * @param filePath 文件路径
   * @param encoding 编码格式
   * @returns 文件内容
   */
  static async readFile(filePath: string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
    return await fs.readFile(filePath, encoding);
  }

  /**
   * 写入文件内容
   * @param filePath 文件路径
   * @param content 文件内容
   * @param encoding 编码格式
   */
  static async writeFile(filePath: string, content: string, encoding: BufferEncoding = 'utf-8'): Promise<void> {
    // 确保目录存在
    await this.ensureDir(path.dirname(filePath));
    await fs.writeFile(filePath, content, encoding);
  }

  /**
   * 获取目录下的所有文件和子目录
   * @param dirPath 目录路径
   * @returns 文件和目录列表
   */
  static async readDir(dirPath: string): Promise<string[]> {
    try {
      return await fs.readdir(dirPath);
    } catch {
      return [];
    }
  }

  /**
   * 获取文件或目录的统计信息
   * @param filePath 文件路径
   * @returns 统计信息
   */
  static async stat(filePath: string): Promise<fs.Stats | null> {
    try {
      return await fs.stat(filePath);
    } catch {
      return null;
    }
  }

  /**
   * 检查路径是否为目录
   * @param dirPath 路径
   * @returns 是否为目录
   */
  static async isDirectory(dirPath: string): Promise<boolean> {
    const stats = await this.stat(dirPath);
    return stats?.isDirectory() ?? false;
  }

  /**
   * 检查路径是否为文件
   * @param filePath 路径
   * @returns 是否为文件
   */
  static async isFile(filePath: string): Promise<boolean> {
    const stats = await this.stat(filePath);
    return stats?.isFile() ?? false;
  }

  /**
   * 生成安全的文件名
   * @param filename 原始文件名
   * @param replacement 替换字符，默认为 '-'
   * @returns 安全的文件名
   */
  static sanitizeFilename(filename: string, replacement = '-'): string {
    return sanitize(filename, { replacement });
  }

  /**
   * 从文件路径中提取文件名（不含扩展名）
   * @param filePath 文件路径
   * @returns 文件名
   */
  static getBasename(filePath: string): string {
    return path.basename(filePath, path.extname(filePath));
  }

  /**
   * 获取文件扩展名
   * @param filePath 文件路径
   * @returns 扩展名
   */
  static getExtension(filePath: string): string {
    return path.extname(filePath);
  }
}
