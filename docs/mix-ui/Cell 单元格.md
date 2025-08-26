# Cell 单元格

## 介绍

单元格为列表中的单个展示项。

主要参考设计稿：

- [独立 APP FAQ 模块](https://www.figma.com/file/w6oqqP4Yq9TbpnbLoec99h/%E7%8B%AC%E7%AB%8BApp-%E4%BC%9A%E5%91%98%E8%B4%AD%E4%B9%B0%40ahuang?node-id=0%3A1&t=nF8KIJ0ftkxVixaT-1)
- [独立 APP 个人中心](https://www.figma.com/file/R7Qb4sftSbkZtDyYFPkIIo/%E4%BC%9A%E5%91%98%E7%8B%AC%E7%AB%8B-App-%E4%B8%80%E6%9C%9F---%E7%94%A8%E6%88%B7%E9%83%A8%E5%88%86-%40xiaoyu-%40liukun?node-id=0%3A1&t=SwRixV83BgUfrvb4-1)
- [独立 APP 目录模块](https://www.figma.com/file/4ZbvjI0gBzrodQsBoycBzL/%E7%8B%AC%E7%AB%8B-App-%E4%B8%80%E6%9C%9F---%E9%98%85%E8%AF%BB%E9%A1%B5%40yunfei?node-id=327%3A38276&t=75Csrcy1NLeqKdOa-1)

## 引入

```js
import { Cell } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

`Cell` 可以单独使用，也可以与 `Cell.Group` 搭配使用，`Cell.Group` 可以为 `Cell` 提供上下外边框。

```tsx
import React from 'react'
import { Cell } from '@kfe/mix-ui'

export default () => {
  return (
    <Cell.Group>
      <Cell title='用户昵称' value='arley' />
      <Cell title='手机号' value='15261763839' />
      <Cell title='组件库名称' value='mix-ui' label='会员 C 端基础组件库' />
    </Cell.Group>
  )
}
```

### 用户列表

通过 `icon` 属性可以自定义左侧内容

```tsx
import React from 'react'
import { Cell, Image } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, idx) => (
        <Cell
          center
          key={idx}
          title={`Avatar ${idx}`}
          label='Deserunt dolor ea eaque eos'
          icon={<Image width={44} height={44} src='https://pic1.zhimg.com/v2-46d65cea72424360bcd1aea3e06c1ed6.png' />}
          isLink
        />
      ))}
    </>
  )
}
```

### 展示图标

通过 `icon` 属性在标题左侧展示图标。

```tsx
import React from 'react'
import {
  Cell,
  Alipay24,
  BadgeCgFill24
} from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Cell title='单元格' icon={<Alipay24 />} />
      <Cell title='单元格' icon={<BadgeCgFill24 />} />
    </>
  )
}
```

### 只设置 value

只设置 `value` 时，内容会靠左对齐。

```tsx
import React from 'react'
import { Cell } from '@kfe/mix-ui'

export default () => {
  return <Cell value='内容' />
}
```

### 展示箭头

设置 `isLink` 属性后会在单元格右侧显示箭头，并且可以通过 `arrowDirection` 属性控制箭头方向。

```tsx
import React from 'react'
import { Cell } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Cell title='单元格' isLink />
      <Cell title='单元格' isLink value='内容' />
      <Cell title='单元格' isLink arrowDirection='down' value='内容' />
    </>
  )
}
```

### 分组标题

通过 `Cell.Group` 的 `title` 属性可以指定分组标题。

```tsx
import React from 'react'
import { Cell } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Cell.Group title='分组1'>
        <Cell title='单元格' value='内容' />
      </Cell.Group>
      <Cell.Group title='分组2'>
        <Cell title='单元格' value='内容' />
      </Cell.Group>
    </>
  )
}
```

### 卡片类型

通过 `Cell.Group` 的 `card` 属性可以可以展示卡片类型。

```tsx
import React from 'react'
import { Cell } from '@kfe/mix-ui'

export default () => {
  return (
    <div style={{ background: '#f6f8fc', height: '100vh', overflow: 'hidden' }}>
      <Cell.Group card>
        <Cell title='单元格' value='内容' />
        <Cell title='单元格' value='内容' />
      </Cell.Group>
    </div>
  )
}
```

### 自定义内容

如以上用法不能满足你的需求，可以来自定义内容。

```tsx
import React from 'react'
import { Cell, BadgeCgFill24 } from '@kfe/mix-ui'

export default () => {
  return (
    <Cell title='单元格' icon={<BadgeCgFill24 />}>
      <div>自定义内容</div>
    </Cell>
  )
}
```

### 垂直居中

通过 `center` 属性可以让 `Cell` 的左右内容都垂直居中。

```tsx
import React from 'react'
import { Cell } from '@kfe/mix-ui'

export default () => {
  return <Cell center title='单元格' value='内容' label='描述信息' />
}
```

## API

### CellGroup Props

| 参数   | 说明                   | 类型      | 默认值 |
| ------ | ---------------------- | --------- | ------ |
| title  | 分组标题               | _string_  | -      |
| border | 是否显示外边框         | _boolean_ | `true` |
| inset / card  | 是否展示为圆角卡片风格 | _boolean_ | -      |

### Cell Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 左侧标题 | _ReactNode_ | - |
| value | 右侧内容 | _number \| string_ | - |
| label | 标题下方的描述信息 | _ReactNode_ | - |
| extra | 自定义单元格最右侧的额外内容 | _ReactNode_ | - |
| icon | 左侧图标 | _ReactNode_ | - |
| rightIcon | 自定义右侧按钮，默认为`arrow` | _ReactNode_ | - |
| border | 是否显示内边框 | _boolean_ | `true` |
| replace | 是否在跳转时替换当前页面历史 | _boolean_ | `false` |
| clickable | 是否开启点击反馈 | _boolean_ | `false` |
| isLink | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
| required | 是否显示表单必填星号 | _boolean_ | `false` |
| center | 是否使内容垂直居中 | _boolean_ | `false` |
| arrowDirection | 箭头方向，可选值为 `left` `up` `down` | _string_ | `right` |
| titleStyle | 左侧标题额外样式 | _string_ | - |
| titleClass | 左侧标题额外类名 | _string_ | - |
| valueClass | 右侧内容额外类名 | _string_ | - |
| labelClass | 描述信息额外类名 | _string_ | - |

### Cell Events

| 事件名  | 说明             | 回调参数       |
| ------- | ---------------- | -------------- |
| onClick | 点击单元格时触发 | _event: Event_ |

### 类型定义

组件导出以下类型定义：

```js
import type { CellProps, CellGroupProps, CellArrowDirection } from '@kfe/mix-ui';
```