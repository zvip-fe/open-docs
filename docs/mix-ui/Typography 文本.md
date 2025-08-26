---
simulator:
  compact: false
  style:
    background: '#fff'
---

# Typography 文本

## 介绍

文本的基本格式，支持个性化文本省略配置，提供多种主题选择。

## 引入

```js
import { Typography } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

```tsx
import React from 'react'
import { Typography } from '@kfe/mix-ui'

export default () => {
  return (
    <Typography.Text>
      mix-ui 是<Typography.Text type='danger'>一个十分好用的</Typography.Text>{' '}
      <Typography.Text delete>组件库</Typography.Text>其功能强大
      <Typography.Text type='primary'>支持定制</Typography.Text> 使用方便
      <Typography.Text
        underline
      >
        强烈建议大家
      </Typography.Text>一起来<Typography.Text type='warning'>提供 pr</Typography.Text>
    </Typography.Text>
  )
}
```

### 文本省略

使用 `ellipsis` 属性可以定制个性化的文本省略形式

> 开启 `ellipsis` 后，请确保 `children` 为纯**字符串**或**数字**类型

```tsx
import React from 'react'
import { Typography, ArrowDown16, ArrowUp16 } from '@kfe/mix-ui'
import './style.less'

const content =
  'mix-ui 是一套轻量 、可靠的移动端 React 组件库，我们提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以 call 给我们，当然，我们也非常欢迎你和我们一起来开发。'

export default () => {
  return (
    <div className='demo-typography'>
      <h4>默认</h4>
      <Typography.Text ellipsis>{content}</Typography.Text>
      <h4>多行省略</h4>
      <Typography.Text ellipsis={2}>{content}</Typography.Text>
      <h4>带展开操作</h4>
      <Typography.Text
        ellipsis={{
          rows: 2,
          collapseText: '收起',
          expandText: '展开'
        }}
      >
        {content}
      </Typography.Text>
      <h4>保留末位文本</h4>
      <Typography.Text
        ellipsis={{
          rows: 2,
          symbol: '......',
          suffixCount: 10
        }}
      >
        {content}
      </Typography.Text>
      <h4>自定义文本后缀</h4>
      <Typography.Text
        ellipsis={{
          rows: 2,
          suffixText: '--Zhihu',
          expandText: '更多'
        }}
      >
        {content}
      </Typography.Text>
      <h4>自定义展开图标</h4>
      <Typography.Text
        ellipsis={{
          rows: 2,
          collapseText: <ArrowUp16 className='mu-typography--collapseicon' />,
          expandText: <ArrowDown16 className='mu-typography--expandicon' />
        }}
      >
        {content}
      </Typography.Text>
    </div>
  )
}
```

### 文本主题

使用 `danger` `secondary` `primary` `success` `warning` 定义不同主题

```tsx
import React from 'react'
import { Typography } from '@kfe/mix-ui'
import './style.less'

const content =
  'mix-ui 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。'

export default () => {
  return (
    <div className='demo-typography'>
      <h4>默认</h4>
      <Typography.Text
        type='primary'
        ellipsis={2}
      >
        {content}
      </Typography.Text>
      <h4>次要</h4>
      <Typography.Text
        type='secondary'
        ellipsis={2}
      >
        {content}
      </Typography.Text>
      <h4>成功</h4>
      <Typography.Text
        type='success'
        ellipsis={2}
      >
        {content}
      </Typography.Text>
      <h4>危险</h4>
      <Typography.Text
        type='danger'
        ellipsis={2}
      >
        {content}
      </Typography.Text>
      <h4>警告</h4>
      <Typography.Text
        type='warning'
        ellipsis={2}
      >
        {content}
      </Typography.Text>
    </div>
  )
}
```

### 标题

`Typography.Title` 使用标题组件

```tsx
import React from 'react'
import { Typography } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Typography.Title level={1}>一级测试标题</Typography.Title>
      <Typography.Title level={2}>二级测试标题</Typography.Title>
      <Typography.Title level={3}>三级测试标题</Typography.Title>
      <Typography.Title level={4}>四级测试标题</Typography.Title>
      <Typography.Title level={5}>五级测试标题</Typography.Title>
      <Typography.Title level={6}>六级测试标题</Typography.Title>
    </>
  )
}
```

### 链接样式

`Typography.Link` 使用链接样式组件

```tsx
import React from 'react'
import { Typography } from '@kfe/mix-ui'

export default () => {
  return (
    <Typography.Link
      href="https://example.com"
      target='_blank'
    >
      测试Link
    </Typography.Link>
  )
}
```

## API

### Typography Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 文本类型，可选值`danger` `secondary` `primary` `success` `warning` | _string_ | - |
| size | 文本大小，可选值`xs` `sm` `md` `lg` `xl` `xxl` | _boolean_ | `md` |
| disabled | 禁用文本 | _boolean_ | `false` |
| ellipsis | 文本省略 | _boolean\|number\|[EllipsisConfig](#ellipsisconfig)_ | `false` |
| delete | 添加删除线样式 | _boolean_ | `false` |
| underline | 添加下划线样式 | _boolean_ | `false` |
| center | 文本居中 | _boolean_ | `false` |
| strong | 文本加粗 | _boolean_ | `false` |
| onClick | 点击事件 | _function_ | - |

#### size 尺寸

- xs: 10px
- sm: 12px
- md: 14px
- lg: 16px
- xl: 20px
- xxl: 24px

### EllipsisConfig

| 参数           | 说明               | 类型                          | 默认值 |
| -------------- | ------------------ | ----------------------------- | ------ |
| rows           | 省略行数           | _number_                      | -      |
| 省略符号       | 省略行数           | _string_                      | `...`  |
| expandText     | 展开操作的文案     | _string_|ReactNode              | -      |
| collapseText   | 收起操作的文案     | _string_|ReactNode              | -      |
| suffixText     | 添加后缀文本       | _string_                      | -      |
| suffixCount    | 保留末位文本数量   | _number_                      | -      |
| onExpend       | 保留末位文本数量   | _(isExpend: boolean) => void_ | -      |
| onContentClick | 点击文本内容时触发 | _(e) => void_                 | -      |

### Typography.Title Props

| 参数  | 说明                                     | 类型     | 默认值 |
| ----- | ---------------------------------------- | -------- | ------ |
| level | 重要程度，可选值 `1` `2` `3` `4` `5` `6` | _number_ | `5`    |

- l1: 28px
- l2: 26px
- l3: 22px
- l4: 20px
- l5: 16px
- l6: 14px