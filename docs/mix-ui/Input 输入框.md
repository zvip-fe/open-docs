# Input 输入框

## 介绍

用户可以在文本框内输入或编辑文字。

## 引入

```js
import { Input } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

可以通过 `value` 和 `onChange` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

```tsx
import React from 'react'
import { Cell, Input, useSetState } from '@kfe/mix-ui'

export default () => {
  const [state, updateState] = useSetState({
    text: '',
    tel: '',
    digit: '',
    num: '',
    password: ''
  })
  return (
    <>
      <Cell>
        <Input
          value={state.text}
          onChange={(text: string) => updateState({ text })}
          placeholder='请输入文本'
        />
      </Cell>
      <Cell>
        <Input
          value={state.tel}
          type='tel'
          onChange={(tel: string) => updateState({ tel })}
          placeholder='请输入手机号'
        />
      </Cell>
      <Cell>
        <Input
          value={state.digit}
          type='digit'
          onChange={(digit: string) => updateState({ digit })}
          placeholder='请输入整数'
        />
      </Cell>
      <Cell>
        <Input
          value={state.num}
          type='number'
          onChange={(num: string) => updateState({ num })}
          placeholder='请输入数字'
        />
      </Cell>

      <Cell>
        <Input
          value={state.password}
          type='password'
          onChange={(password: string) => updateState({ password })}
          placeholder='请输入密码'
        />
      </Cell>
    </>
  )
}
```

### 清除按钮

可以通过 `clearable` `clearIcon` `clearTrigger` 可以控制清除按钮的展示时机以及自定义按钮内容。

```tsx
import React, { useState } from 'react'
import { Input, Cell } from '@kfe/mix-ui'

export default () => {
  const [value, setValue] = useState('')
  return (
    <Cell>
      <Input
        placeholder='请输入文本'
        value={value}
        onChange={setValue}
        clearable
        clearTrigger='always'
      />
    </Cell>
  )
}
```

### 插入内容

可以通过 `prefix` `suffix` 可以插入内容。

```tsx
import React from 'react'
import { Input, Cell, Button } from '@kfe/mix-ui'

export default () => {
  return (
    <Cell>
      <Input
        prefix='💁'
        suffix={<Button style={{ width: '60px', margin: 0 }} square type='default'>发送</Button>}
        placeholder='请输入短信验证码'
      />
    </Cell>
  )
}
```

### 多行输入

`Input.TextArea` 可用于多行输入， `autoSize` 可以使文本域自适应高度，还能设置其最小和最大高度。

```tsx
import React from 'react'
import { Input, Cell } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Cell>
        <Input.TextArea placeholder='多行输入' />
      </Cell>
      <Cell style={{ marginTop: 10 }}>
        <Input.TextArea placeholder='自适应高度' autoSize />
      </Cell>
      <Cell style={{ marginTop: 10 }}>
        <Input.TextArea
          placeholder='最小高度80，最大高度120'
          autoSize={{ minHeight: 80, maxHeight: 120 }}
        />
      </Cell>
    </>
  )
}
```

### 字数统计

通过 `maxLength` 和 `showWordLimit` 可以开启输入框字数显示。

```tsx
import React from 'react'
import { Toast, Input, Cell } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Cell>
        <Input
          placeholder='最多输入10个字符'
          maxLength={10}
          onOverlimit={() => Toast.info('不能超过10个字符哦')}
        />
      </Cell>
      <Cell style={{ marginTop: 10 }}>
        <Input.TextArea placeholder='字数统计' maxLength={50} showWordLimit />
      </Cell>
      <Cell style={{ marginTop: 10 }}>
        <Input.TextArea
          placeholder='自定义输出'
          showWordLimit={({ currentCount }) => <span>已经输入{currentCount}个字啦 ✍️</span>}
        />
      </Cell>
    </>
  )
}
```

### 对齐方式

可以通过 `align` 属性可以控制输入框内容对齐方式。

```tsx
import React, { useState } from 'react'
import { Input, Cell } from '@kfe/mix-ui'

export default () => {
  const [value, setValue] = useState('')
  return (
    <>
      <Cell>
        <Input placeholder='内容居中' value={value} onChange={setValue} align='center' />
      </Cell>
      <Cell>
        <Input placeholder='内容右对齐' value={value} onChange={setValue} align='right' />
      </Cell>
    </>
  )
}
```

### 输入框状态

- `readOnly` 控制只读状态
- `disabled` 控制禁用状态

```tsx
import React, { useState } from 'react'
import { Input, Cell } from '@kfe/mix-ui'

export default () => {
  const [value1, setValue1] = useState('只读模式')
  const [value2, setValue2] = useState('禁用模式')
  return (
    <>
      <Cell>
        <Input value={value1} onChange={setValue1} readOnly />
      </Cell>
      <Cell>
        <Input value={value2} onChange={setValue2} disabled />
      </Cell>
    </>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前输入的值 | _string_ | - |
| defaultValue | 默认值 | _string_ | - |
| name | 名称，提交表单的标识符 | _string_ | - |
| type | 输入框类型, 可选值为 `tel` `digit` `number` `textarea` `password` 等, <br /> 对 `Input.TextArea` 无效 | _string_ | `text` |
| maxLength | 输入的最大字符数 | _number_ | - |
| placeholder | 输入框占位提示文字 | _string_ | - |
| disabled | 是否禁用输入框 | _boolean_ | `false` |
| readOnly | 是否只读 | _boolean_ | `false` |
| clearable | 是否启用清除图标，点击清除图标后会清空输入框 | _boolean_ | `false` |
| clearIcon | 自定义清除图标 | _ReactNode_ | `<Clear />` |
| clearTrigger | 显示清除图标的时机，<br /> `always` 表示输入框不为空时展示，<br /> `focus` 表示输入框聚焦且不为空时展示 | `always` `focus` | `focus` |
| autoFocus | 是否自动聚焦，iOS 系统不支持该属性 | _boolean_ | `false` |
| align | 输入框对齐方式，可选值为 `center` `right`，对 `Input.TextArea` 无效 | _string_ | `left` |
| prefix | 插入前置内容， 对 `Input.TextArea` 无效 | _ReactNodec_ | - |
| suffix | 插入后置内容， 对 `Input.TextArea` 无效 | _ReactNodec_ | - |

### Input.TextArea Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 输入框行数 | _number_ | 2 |
| showWordLimit | 是否显示字数统计，支持自定义内容 | _boolean\|({ currentCount, maxLengh }) => ReactNode_ | `false` |
| autoSize | 是否自适应内容高度，可传入对象,如 `{ maxHeight: 100, minHeight: 50 }`，单位为`px` | _boolean \| object_ | `false` |

### Events

| 事件        | 说明                            | 回调参数            |
| ----------- | ------------------------------- | ------------------- |
| onChange    | 当值变化时触发                  | _val: string_       |
| onFocus     | 输入框获得焦点时触发            | _event: MouseEvent_ |
| onBlur      | 输入框失去焦点时触发            | _event: MouseEvent_ |
| onClear     | 点击清除按钮时触发              | _event: MouseEvent_ |
| onClick     | 点击 `Input` 时触发             | _event: MouseEvent_ |
| onOverlimit | 当输入值超出 `maxLength` 时触发 | -                   |

### 方法

通过 `ref` 可以获取到 `Input` 实例并调用实例方法

| 方法名        | 说明                | 参数                  | 返回值 |
| ------------- | ------------------- | --------------------- | ------ |
| focus         | 获取输入框焦点      | -                     | -      |
| blur          | 取消输入框焦点      | -                     | -      |
| clear         | 清空输入内容        | -                     | -      |
| nativeElement | 获取原始 `DOM` 元素 | _HTMLElement \| null_ | -      |