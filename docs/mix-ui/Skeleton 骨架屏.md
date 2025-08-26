# Skeleton 骨架屏

## 介绍

用于在内容加载过程中展示一组占位图形。

## 引入

```js
import { Skeleton } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

通过 `title` 属性显示标题占位图，通过 `row` 属性配置占位段落行数。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Skeleton } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='基础用法' padding='12px'>
      <Skeleton title />
    </DemoBlock>
  )
}
```

### 显示头像

通过 `avatar` 属性显示头像占位图。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Skeleton } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='头像占位图' padding='12px'>
      <Skeleton avatar />
    </DemoBlock>
  )
}
```

通过 `image` 属性显示头像占位图。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Skeleton } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='图片占位图' padding='12px'>
      <Skeleton image row={2} />
    </DemoBlock>
  )
}
```

### 自定义高度

通过 `rowHeight` 属性显示头像占位图。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Skeleton } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='自定义高度' padding='12px'>
      <Skeleton rowHeight={10} />
    </DemoBlock>
  )
}
```

### 展示子组件

将 `loading` 属性设置成 `false` 表示内容加载完成，此时会隐藏占位图，并显示 `Skeleton` 的子组件。

```tsx
import React, { useState } from 'react'
import { DemoBlock } from 'demos'
import { Skeleton, Button } from '@kfe/mix-ui'

export default () => {

  const [loading, setLoading] = useState(true)

  const handleClick = () => {
    setLoading(prev => !prev)
  }

  return (
    <DemoBlock title='展示子组件' padding='12px'>
      <Button onClick={handleClick}>状态改变</Button>
      <Skeleton loading={loading}>
        <div>子组件</div>
      </Skeleton>
    </DemoBlock>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| row | 段落占位图行数 | _number \| string_ | `3` |
| rowWidth | 段落占位图宽度，可传数组来设置每一行的宽度 | _number \| string \|<br>(number \| string)[]_ | `100%` |
| rowHeight | 段落占位图高度，可传数组来设置每一行的高度 | _number \| string \|<br>(number \| string)[]_ | - |
| title | 是否显示标题占位图 | _boolean_ | `false` |
| avatar | 是否显示头像占位图 | _boolean_ | `false` |
| image | 是否显示图片占位图 | _boolean_ | `false` |
| loading | 是否显示骨架屏，传 `false` 时会展示子组件内容 | _boolean_ | `true` |
| animate | 是否开启动画 | _boolean_ | `true` |
| round | 是否将标题和段落显示为圆角风格 | _boolean_ | `false` |
| titleWidth | 标题占位图宽度 | _number \| string_ | `40%` |
| imageWidth | 图片占位图宽度 | _number \| string_ | `95px` |
| avatarSize | 头像占位图大小 | _number \| string_ | `32px` |
| avatarShape | 头像占位图形状，可选值为 `square` | _string_ | `round` |
| className | 类名 | _string_ | - |
| style | style | _React.CSSProperties_ | - |