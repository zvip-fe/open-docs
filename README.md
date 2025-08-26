# 知乎开放文档处理工具

这是一个用于处理和转换各种组件库文档的 TypeScript 工具。将部分项目中的文档抽离开源，用于 AI 理解。

目前支持 Mix-UI 组件库的文档处理。

## 功能特性

- 🚀 **可扩展架构**: 支持多种文档处理器，便于扩展新的组件库
- 📝 **代码示例处理**: 自动将 `<code src="...">` 标签替换为实际的代码内容
- 🔧 **智能文件命名**: 使用安全的文件名生成，支持中文标题
- 🧹 **内容清理**: 自动移除更新日志等不需要的内容，支持敏感信息清理
- 📁 **目录结构保持**: 保持原有的组件目录结构

## 安装依赖

```bash
pnpm install
```

## 使用方法

### 构建项目

```bash
pnpm build
```

### 运行文档处理器

#### 处理 Mix-UI 文档
```bash
# 基本用法
pnpm process-mixui

# 或者直接使用
node dist/index.js mixui

# 启用调试模式
node dist/index.js mixui --debug

# 自定义源目录和目标目录
node dist/index.js mixui --source-dir custom/source --target-dir custom/output
```

#### 查看帮助信息
```bash
node dist/index.js --help
```

## 项目结构

```
scripts/
├── config/          # 配置文件
│   └── index.ts     # 全局配置
├── types/           # 类型定义
│   └── index.ts
├── utils/           # 工具类
│   ├── file.ts      # 文件操作工具
│   ├── markdown.ts  # Markdown 处理工具
│   ├── sensitive.ts # 敏感信息清理工具
│   └── index.ts
├── processors/      # 文档处理器
│   ├── mixui-processor.ts  # Mix-UI 处理器
│   └── index.ts
└── index.ts         # 主入口文件
```

## Mix-UI 处理器功能

Mix-UI 处理器会执行以下操作：

1. **扫描组件**: 扫描 `node_modules/@kfe/mix-ui/src/components` 下的所有组件
2. **过滤组件**: 只处理包含 `demos` 目录的组件
3. **处理 README**: 
   - 读取每个组件的 `README.md` 文件
   - 将 `<code src="./demos/xxx.tsx">` 标签替换为实际的 TypeScript 代码
   - 移除 "## 更新日志" 及其后的所有内容
4. **生成文件**: 
   - 使用组件标题作为文件名（如 "Button 按钮.md"）
   - 保存到 `docs/mix-ui/` 目录下

## 扩展新的处理器

要添加新的文档处理器，请按以下步骤操作：

1. 在 `scripts/processors/` 目录下创建新的处理器文件
2. 实现 `IDocProcessor` 接口
3. 在 `scripts/index.ts` 中注册新的处理器

示例：

```typescript
// scripts/processors/my-processor.ts
import { IDocProcessor, ProcessOptions } from '../types/index.js';

export class MyProcessor implements IDocProcessor {
  public readonly name = 'my-library';

  async process(options: ProcessOptions = {}): Promise<void> {
    // 实现你的处理逻辑
  }
}
```

```typescript
// scripts/index.ts
import { MyProcessor } from './processors/my-processor.js';

const processors: Record<string, IDocProcessor> = {
  mixui: new MixUIProcessor(),
  mylibrary: new MyProcessor(), // 添加新的处理器
};
```

## 配置选项

### 命令行选项

每个处理器都支持以下通用选项：

- `--source-dir`: 指定源目录路径
- `--target-dir`: 指定目标目录路径
- `--debug`: 启用调试模式，显示详细的处理信息

### 环境变量配置

可以通过环境变量调整部分行为：

```bash
# 关闭敏感信息清理（默认开启）
CLEAN_SENSITIVE=false
```

## 输出示例

处理后的文档会保存在指定的目标目录中，文件名基于组件的标题生成：

```
docs/mix-ui/
├── Button 按钮.md
├── Empty 空状态.md
├── Form 表单.md
└── ...
```

每个文档文件都包含：
- 完整的组件介绍和 API 文档
- 实际的 TypeScript 代码示例（替换了原来的 code 标签）
- 清理后的内容（移除了更新日志）

## 开发

### 开发模式

```bash
pnpm dev
```

这会启动 tsup 的监听模式，文件变更时自动重新构建。

### 调试

使用 `--debug` 选项可以查看详细的处理过程：

```bash
node dist/index.js mixui --debug
```

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 开发规范

- 使用 TypeScript 编写代码
- 添加完整的 JSDoc 注释
- 确保所有测试通过
- 遵循现有的代码风格

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
