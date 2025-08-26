# Switch 开关

## 介绍

用于在打开和关闭状态之间进行切换。

## 引入

```js
import { Switch } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

通过 `defaultChecked` 默认开关的选中状态，`true` 表示开，`false` 表示关。

```tsx
import React from 'react'
import { Switch } from '@kfe/mix-ui'

export default () => {
  return <Switch defaultChecked />
}
```

### 禁用状态

通过 `disabled` 属性来禁用开关，禁用状态下开关不可点击。

```tsx
import React from 'react'
import { Switch } from '@kfe/mix-ui'

export default () => {
  return <Switch disabled defaultChecked />
}
```

### 加载状态

通过 `loading` 属性设置开关为加载状态，加载状态下开关不可点击。

```tsx
import React from 'react'
import { Switch } from '@kfe/mix-ui'

export default () => {
  return <Switch loading defaultChecked />
}
```

### 自定义大小

通过 `size` 属性自定义开关的大小。

```tsx
import React from 'react'
import { Switch } from '@kfe/mix-ui'

export default () => {
  return <Switch size='24px' defaultChecked />
}
```

### 自定义颜色

`activeColor` 属性表示打开时的背景色，`inactiveColor` 表示关闭时的背景色。

```tsx
import React from 'react'
import { Switch } from '@kfe/mix-ui'

export default () => {
  return <Switch activeColor='#ee0a24' inactiveColor='#dcdee0' defaultChecked />
}
```

### 异步控制

需要异步控制开关时，可以使用 `checked` 属性和 `onChange` 事件代替 `defaultChecked`，并在事件回调函数中手动处理开关状态。

```tsx
import React, { useState } from 'react'
import { Switch, Dialog } from '@kfe/mix-ui'

export default () => {
  const [value, setValue] = useState(false)
  const onChange = async (checked: any) => {
    try {
      await Dialog.confirm({
        title: '提醒',
        message: '是否切换开关？'
      })
      setValue(checked)
    } catch {
      // 取消dialog
    }
  }
  return <Switch checked={value} onChange={onChange} />
}
```

### 搭配单元格使用

```tsx
import React from 'react'
import { Switch, Cell } from '@kfe/mix-ui'

export default () => {
  return (
    <Cell
      center
      title='标题'
      rightIcon={
        <Switch
          size={24}
          defaultChecked
          onChange={(checked: any) => console.log(`switch to ${checked}`)}
        />
      }
    />
  )
}
```

## API

### Props

| 参数           | 说明                     | 类型               | 默认值    |
| -------------- | ------------------------ | ------------------ | --------- |
| checked        | 开关选中状态             | _any_              | `false`   |
| defaultChecked | 开关选中状态             | _any_              | `false`   |
| loading        | 是否为加载状态           | _boolean_          | `false`   |
| disabled       | 是否为禁用状态           | _boolean_          | `false`   |
| size           | 开关尺寸，默认单位为`px` | _number \| string_ | `30px`    |
| activeColor    | 打开时的背景色           | _string_           | - |
| inactiveColor  | 关闭时的背景色           | _string_           | -   |
| activeValue    | 打开时对应的值           | _any_              | `true`    |
| inactiveValue  | 关闭时对应的值           | _any_              | `false`   |

### Events

| 事件名   | 说明               | 回调参数       |
| -------- | ------------------ | -------------- |
| onChange | 开关状态切换时触发 | _value: any_   |
| onClick  | 点击时触发         | _event: Event_ |