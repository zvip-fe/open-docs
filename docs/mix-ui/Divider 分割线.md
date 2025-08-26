---
simulator:
  compact: false
  style:
    background: '#fff'
---

# Divider 分割线

## 介绍

分隔线可以将内容分成清晰的几组。

## 引入

```js
import { Divider } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

默认渲染一条水平分割线, 添加 `dashed` 属性使分割线渲染为虚线。
```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Divider } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <DemoBlock title='基础用法' padding='12px'>
        <Divider />
      </DemoBlock>
      <DemoBlock title='虚线' padding='12px'>
        <Divider dashed />
      </DemoBlock>
    </>
  )
}
```

### 展示文字

通过插槽可以在分割线中间插入内容。
```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Divider } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <DemoBlock title='插入文字' padding='12px'>
        <Divider>没有更多浏览记录了</Divider>
      </DemoBlock>
      <DemoBlock title='插入图片' padding='12px'>
        <Divider>
          <img src='https://picd.zhimg.com/v2-859d5b3d123204e667bf8d39adb06439.png' alt='' />
        </Divider>
      </DemoBlock>
    </>
  )
}
```

### 不展示分割线

通过`showLine`属性隐藏分割线，只展示文字内容。
```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Divider } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='不展示分割线' padding='12px'>
      <Divider showLine={false}>没有更多内容了</Divider>
    </DemoBlock>
  )
}
```

### 自定义样式

可以直接通过 `style` 属性设置分割线的样式，通过`padding`值可以改变分割线长度
```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Divider } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock title='自定义样式' padding='12px'>
      <Divider style={{ padding: '0 20px', color: '#3f45ff', borderColor: '#3f45ff' }}>
        自定义样式
      </Divider>
    </DemoBlock>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| showLine | 是否展示分割线 | _boolean_ | `true` |
| dashed | 是否使用虚线 | _boolean_ | `false` |
| hairline | 是否使用 0.5px 线 | _boolean_ | `true` |
| className | 类名 | _string_ | - |
| style | style | _React.CSSProperties_ | - |