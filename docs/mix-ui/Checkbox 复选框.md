# Checkbox 复选框

## 介绍

用于在选中和非选中状态之间进行切换。

## 引入

```js
import { Checkbox } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

- 通过 `defaultChecked` 值默认复选框的勾选状态。
- 通过设置 `disabled` 属性可以禁用复选框。
- 设置 `labelDisabled` 属性后，点击图标以外的内容不会触发复选框切换。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Checkbox } from '@kfe/mix-ui'

export default () => {
  const [checked, setChecked] = React.useState(false)
  return (
    <DemoBlock title='基础用法' padding='12px'>
      <Checkbox checked={checked} onChange={setChecked}>
        复选框
      </Checkbox>
      <br />
      <Checkbox defaultChecked onChange={val => console.log(val)}>
        默认勾选
      </Checkbox>
      <br />
      <Checkbox disabled>禁用复选框</Checkbox>
      <br />
      <Checkbox defaultChecked labelDisabled>
        禁止文本点击
      </Checkbox>
    </DemoBlock>
  )
}
```

### 自定义

- 通过 `checkedColor` 属性设置选中状态的图标颜色。
- 通过 `iconSize` 属性可以自定义图标的大小。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Checkbox } from '@kfe/mix-ui'

const activeIcon = 'https://img.yzcdn.cn/vant/user-active.png'
const inactiveIcon = 'https://img.yzcdn.cn/vant/user-inactive.png'

export default () => {
  return (
    <DemoBlock>
      <Checkbox defaultChecked checkedColor='red'>
        自定义颜色
      </Checkbox>
      <br />
      <Checkbox defaultChecked iconSize='16px'>
        自定义大小
      </Checkbox>
      <br />
      <Checkbox
        defaultChecked
        iconRender={({ checked: isActive }) => (
          <img style={{ height: 24, width: 24 }} alt='' src={isActive ? activeIcon : inactiveIcon} />
        )}
      >
        自定义图标
      </Checkbox>
    </DemoBlock>
  )
}
```

### 异步更新

设置 `checked` 属性后，点击图标状态不会改变，而是直接执行 `onChange` 方法，在此方法中更换状态

```tsx
import React, { useState } from 'react'
import { Checkbox, Loading } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [value, setValue] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <DemoBlock>
      <Checkbox
        checked={value}
        onChange={val => {
          setLoading(true)
          setTimeout(() => {
            setValue(val)
            setLoading(false)
          }, 500)
        }}
      >
        复选框
      </Checkbox>
      {loading && <Loading>加载中</Loading>}
    </DemoBlock>
  )
}
```

### 复选框组

复选框可以与复选框组一起使用，复选框组通过 `defaultChecked` 数组默认复选框的勾选状态。

```tsx
import React from 'react'
import { Checkbox } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <DemoBlock>
      <Checkbox.Group onChange={v => console.log(v)} defaultValue={['a', 'b']}>
        <Checkbox name='a'>复选框组a</Checkbox>
        <Checkbox name='b'>复选框组b</Checkbox>
        <Checkbox name='c'>复选框组c</Checkbox>
      </Checkbox.Group>
    </DemoBlock>
  )
}
```

### 水平排列

将 `direction` 属性设置为 `horizontal` 后，复选框组会变成水平排列。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Checkbox } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock>
      <Checkbox.Group defaultValue={[]} direction='horizontal'>
        <Checkbox name='a'>复选框a</Checkbox>
        <Checkbox name='b'>复选框b</Checkbox>
      </Checkbox.Group>
    </DemoBlock>
  )
}
```

### 最大可选数

通过 `max` 属性可以限制复选框组的最大可选数。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { Checkbox } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock>
      <Checkbox.Group defaultValue={[]} max={2}>
        <Checkbox name='a'>复选框a</Checkbox>
        <Checkbox name='b'>复选框b</Checkbox>
        <Checkbox name='c'>复选框c</Checkbox>
      </Checkbox.Group>
    </DemoBlock>
  )
}
```

### 全选与反选

通过 `CheckboxGroup` 实例上的`toggleAll`方法可以实现全选与反选。

```tsx
import React, { useState, useRef } from 'react'
import { Checkbox, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import { CheckboxGroupInstance } from '../PropsType'

export default () => {
  const ref = useRef<CheckboxGroupInstance>(null)
  const [checkAll, setCheckAll] = useState(['a'])

  return (
    <DemoBlock>
      <Checkbox.Group ref={ref} value={checkAll} onChange={setCheckAll}>
        <Checkbox name='a'>复选框组a</Checkbox>
        <Checkbox name='b'>复选框组b</Checkbox>
        <Checkbox name='c'>复选框组c</Checkbox>
      </Checkbox.Group>
      <div>
        <Button type='primary' onClick={() => ref.current?.toggleAll(true)}>
          全选
        </Button>
        <Button type='primary' onClick={() => ref.current?.toggleAll()}>
          反选
        </Button>
      </div>
    </DemoBlock>
  )
}
```

## API

### Checkbox Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否为选中状态 | _boolean_ | `false` |
| defaultChecked | 默认选中项的标识符 | _any[]_ | - |
| name | 标识符 | _any_ | - |
| disabled | 是否禁用复选框 | _boolean_ | `false` |
| labelDisabled | 是否禁用复选框文本点击 | _boolean_ | `false` |
| labelPosition | 文本位置，可选值为 `left` | _string_ | `right` |
| iconSize | 图标大小，默认单位为 `px` | _number \| string_ | `24px` |
| iconRender | 自定义图标 | _({ checked, disabled }) => ReactNode_ | - |
| checkedColor | 选中状态颜色 | _string_ | `GBL01A 知乎蓝` |
| bindGroup | 是否与复选框组绑定 | _boolean_ | `true` |

### CheckboxGroup Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 所有选中项的标识符 | _any[]_ | - |
| defaultChecked | 默认选中项的标识符 | _any[]_ | - |
| disabled | 是否禁用所有复选框 | _boolean_ | `false` |
| max | 最大可选数 | _number \| string_ | - |
| direction | 排列方向，可选值为 `horizontal` | _string_ | `vertical` |
| iconSize | 所有复选框的图标大小，默认单位为 `px` | _number \| string_ | `24px` |
| checkedColor | 所有复选框的选中状态颜色 | _string_ | `GBL01A 知乎蓝` |

### Checkbox Events

| 事件名   | 说明                     | 回调参数            |
| -------- | ------------------------ | ------------------- |
| onChange | 当绑定值变化时触发的事件 | _checked: boolean_  |
| onClick  | 点击复选框时触发         | _event: MouseEvent_ |

### CheckboxGroup Events

| 事件名   | 说明                     | 回调参数       |
| -------- | ------------------------ | -------------- |
| onChange | 当绑定值变化时触发的事件 | _names: any[]_ |

### CheckboxGroup 方法

通过 ref 可以获取到 CheckboxGroup 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggleAll | 切换所有复选框，传 `true` 为选中，`false` 为取消选中，不传参为取反 | _options?: boolean \| object_ | - |

### Checkbox 方法

通过 ref 可以获取到 Checkbox 实例并调用实例方法。

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| toggle | 切换选中状态，传 `true` 为选中，`false` 为取消选中，不传参为取反 | _checked?: boolean_ | - |

### 类型定义

通过 `CheckboxInstance` 和 `CheckboxGroupInstance` 获取 Checkbox 实例的类型定义。

```ts
import { useRef } from 'react';
import type { CheckboxInstance, CheckboxGroupInstance } from '@kfe/max-ui';

const checkboxRef = useRef<CheckboxInstance>();
const checkboxGroupRef = useRef<CheckboxGroupInstance>();

checkboxRef.current?.toggle();
checkboxGroupRef.current?.toggleAll();
```