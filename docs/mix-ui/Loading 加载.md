# Loading 加载

## 介绍

加载图标，用于表示加载中的过渡状态。

## 引入

```js
import { Loading } from '@kfe/mix-ui';
```

## 代码演示

### 自定义颜色

通过 `color` 属性设置加载图标的颜色。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Loading } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='自定义颜色' padding='12px'>
      <Loading>加载中...</Loading>
      <br />
      <Loading color='#ef5350'>加载中...</Loading>
    </DemoBlock>
  )
}
```

### 自定义大小

通过 `size` 属性设置加载图标的大小，默认单位为 `px`。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Loading } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='自定义大小' padding='12px'>
      <Loading>加载中...</Loading>
      <br />
      <Loading size={20}>加载中...</Loading>
    </DemoBlock>
  )
}
```

### 加载文案

可以使用默认插槽在图标的下方插入加载文案。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Loading } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='文案横向排列' padding='12px'>
      <Loading vertical={false}>加载中...</Loading>
      <br />
      <Loading />
    </DemoBlock>
  )
}
```

## API

### Props

| 参数      | 说明                         | 类型               | 默认值     |
| --------- | ---------------------------- | ------------------ | ---------- |
| color     | 颜色                         | _string_           | `#999999`  |
| size      | 加载图标大小，默认单位为`px` | _number \| string_ | `24px`     |
| textSize  | 文字大小，默认单位为`px`     | _number \| string_ | `12px`     |
| textColor | 文字颜色                     | _string_           | `#999999`  |
| vertical  | 是否垂直排列图标和文字内容   | _boolean_          | `true`    |

### 类型定义

组件导出以下类型定义：

```ts
import type { LoadingProps } from '@kfe/mix-ui';
```