# Space 间距

## 介绍

设置组件之间的间距，避免组件紧贴在一起，拉开统一的空间。

## 引入

```js
import { Space } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

相邻组件水平间距。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Space, Typography } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='相邻组件水平间距' padding='12px'>
      <Space align='center'>
        Space
        <Typography>Button</Typography>
        <Typography>Confirm</Typography>
      </Space>
    </DemoBlock>
  )
}
```

### 分隔符

相邻组件分隔符。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Space, Typography } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='相邻组件分隔符' padding='12px'>
      <Space align='center' divider={<hr />}>
        <Typography.Link>Info</Typography.Link>
        <Typography.Link>Edit</Typography.Link>
        <Typography.Link type='danger'>Delete</Typography.Link>
      </Space>
    </DemoBlock>
  )
}
```

### 垂直间距

相邻组件垂直间距，可以设置 width: 100% 独占一行。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Space, Typography } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='相邻组件垂直间距' padding='12px'>
      <Space direction='vertical'>
        {new Array(2).fill(null).map((_, index) => (
          <Typography key={index}>Button</Typography>
        ))}
      </Space>
    </DemoBlock>
  )
}
```

### 间距大小

通过 `gap` 属性可以调整间距大小。

- `gap` 设置为数组时可以同时调整垂直方向和水平方向的间距大小

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Space, Typography } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='相邻组件水平间距' padding='12px'>
      <Space gap={20}>
        {new Array(2).fill(null).map((_, index) => (
          <Typography key={index}>Button</Typography>
        ))}
      </Space>
    </DemoBlock>
  )
}
```

### 对齐

设置对齐模式。

- 通过 `justify` 属性可以灵活调整主轴对齐方式。
- 通过 `align` 属性可以灵活调整交叉轴对齐方式。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Space } from '@kfe/mix-ui'

const Child = ({ children }) => (
  <div style={{ padding: 15, border: '1px solid #eee', borderRadius: 4 }}>{children}</div>
)

export default () => {
  return (
    <DemoBlock title='设置对齐模式' padding='12px'>
      <>
        {/* 主轴对齐 */}
        <Space justify='center' block style={{ marginBottom: 20 }}>
          <Child>1</Child>
          <Child>
            2<br />2
          </Child>
          <Child>
            3<br />3<br />3
          </Child>
        </Space>
        {/* 交叉轴对齐 */}
        <Space align='end'>
          <Child>1</Child>
          <Child>
            2<br />2
          </Child>
          <Child>
            3<br />3<br />3
          </Child>
        </Space>
      </>
    </DemoBlock>
  )
}
```

### 自动换行

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Space, Typography } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='自动换行' padding='12px'>
      <Space wrap gap={[8, 20]}>
        {new Array(6).fill(null).map((_, index) => (
          <Typography key={index}>Button</Typography>
        ))}
      </Space>
    </DemoBlock>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gap | 间距大小 | _string\|number\|[string, string]_ | - |
| justify | 主轴对齐方式 | _'start'\| 'end'\| 'center'\| 'between'\| 'around'\| 'evenly'\| 'stretch'_ | - |
| align | 交叉轴对齐方式 | _'start'\| 'end'\| 'center'\| 'baseline'_ | - |
| direction | 间距方向 | _'vertical' \| 'horizontal'_ | `horizontal` |
| wrap | 是否自动换行，仅在 horizontal 时有效 | _boolean_ | `false` |
| block | 是否渲染为块级元素 | _boolean_ | `false` |
| divider | 分隔符 | _ReactNode_ | - |

### 事件

| 事件名  | 说明       | 回调参数            |
| ------- | ---------- | ------------------- |
| onClick | 点击时触发 | _event: MouseEvent_ |

### 兼容性
- 部分低版本浏览器还未兼容 gap 属性