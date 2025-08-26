#!/usr/bin/env node

import { MixUIProcessor } from './processors/index.js';
import { IDocProcessor } from './types/index.js';

/**
 * 文档处理器注册表
 */
const processors: Record<string, IDocProcessor> = {
  mixui: new MixUIProcessor(),
};

/**
 * 显示帮助信息
 */
function showHelp(): void {
  console.log(`
📚 文档处理工具

用法:
  node dist/index.js [processor] [options]

可用的处理器:
${Object.keys(processors).map(name => `  - ${name}: ${processors[name].name} 文档处理器`).join('\n')}

选项:
  --help, -h     显示帮助信息
  --debug        启用调试模式
  --source-dir   指定源目录
  --target-dir   指定目标目录

示例:
  node dist/index.js mixui
  node dist/index.js mixui --debug
  node dist/index.js mixui --source-dir custom/path --target-dir output/path
  `);
}

/**
 * 解析命令行参数
 */
function parseArgs(): { processor?: string; options: Record<string, any> } {
  const args = process.argv.slice(2);
  const options: Record<string, any> = {};
  let processor: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      showHelp();
      process.exit(0);
    } else if (arg === '--debug') {
      options.debug = true;
    } else if (arg === '--source-dir') {
      options.sourceDir = args[++i];
    } else if (arg === '--target-dir') {
      options.targetDir = args[++i];
    } else if (!processor && !arg.startsWith('--')) {
      processor = arg;
    }
  }

  return { processor, options };
}

/**
 * 主函数
 */
async function main(): Promise<void> {
  try {
    const { processor: processorName, options } = parseArgs();

    // 如果没有指定处理器，显示帮助信息
    if (!processorName) {
      console.log('❌ 请指定要使用的处理器\n');
      showHelp();
      process.exit(1);
    }

    // 检查处理器是否存在
    const processor = processors[processorName];
    if (!processor) {
      console.error(`❌ 未知的处理器: ${processorName}`);
      console.log(`\n可用的处理器: ${Object.keys(processors).join(', ')}`);
      process.exit(1);
    }

    // 执行处理
    console.log(`🚀 开始执行 ${processor.name} 处理器...\n`);
    const startTime = Date.now();
    
    await processor.process(options);
    
    const duration = Date.now() - startTime;
    console.log(`\n✅ 处理完成，耗时: ${duration}ms`);

  } catch (error) {
    console.error('❌ 处理过程中发生错误:', error);
    process.exit(1);
  }
}

// 运行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
