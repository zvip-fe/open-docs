# Field 表单项

## 介绍

表单中的输入框组件, `Field` 是基于 `Cell` 实现的，可以使用 `Cell.Group` 作为容器来提供外边框。

## 引入

```js
import { Field } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

可以通过 `value` 和 `onChange` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

```tsx
import React from 'react'
import { Field } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <DemoBlock title='基础用法' padding='12px 0'>
      <Field
        label='文本1'
        required
        tooltip='提示tooltip'
        intro={<div>We must make sure that your are a human.</div>}
        placeholder='请输入文本'
      />
      <Field
        label='文本2'
        tooltip='提示tooltip'
        intro={<div>We must make sure that your are a human.</div>}
        placeholder='请输入文本'
      />
    </DemoBlock>
  )
}
```

### 显示图标

通过 `leftIcon` 和 `rightIcon` 配置输入框两侧的图标，通过设置 `clearable` 在输入过程中展示清除图标。

```tsx
import React, { useState } from 'react'
import { Cell, Field, Toast, Shop16, ExclamationCircle24 } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')

  return (
    <DemoBlock title='显示图标' padding='12px 0'>
      <Cell.Group>
        <Field
          value={value1}
          onChange={setValue1}
          label='文本'
          leftIcon={<Shop16 />}
          rightIcon={<ExclamationCircle24 />}
          placeholder='显示图标'
          onClickLeftIcon={() => Toast.info('左侧图标点击')}
          onClickRightIcon={() => Toast.info('右侧图标点击')}
        />
        <Field
          value={value2}
          onChange={setValue2}
          clearable
          label='文本'
          leftIcon={<Shop16 />}
          placeholder='显示清除图标'
        />
      </Cell.Group>
    </DemoBlock>
  )
}
```

### 错误提示

设置 `required` 属性表示这是一个必填项，可以配合 `error` 或 `errorMessage` 属性显示对应的错误提示。

```tsx
import React, { useState } from 'react'
import { Cell, Field } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  return (
    <DemoBlock title='错误提示' padding='12px 0'>
      <Cell.Group>
        <Field
          value={username}
          error
          required
          label='用户名'
          placeholder='请输入用户名'
          onChange={setUsername}
        />
        <Field
          value={phone}
          required
          label='手机号'
          placeholder='请输入手机号'
          errorMessage='手机号格式错误'
          onChange={setPhone}
        />
      </Cell.Group>
    </DemoBlock>
  )
}
```

### 插入按钮

通过 `prefix` `suffix` 属性可以在输入框前面和尾部插入自定义内容。

```tsx
import React, { useState } from 'react'
import { Field, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [sms, setSms] = useState('')

  return (
    <DemoBlock title='插入按钮' padding='12px 0'>
      <Field
        value={sms}
        center
        label='短信验证码'
        placeholder='手机号'
        onChange={setSms}
        suffix={
          <Button type='default' style={{ width: '60px', margin: 0 }} square>
            发送
          </Button>
        }
      />
    </DemoBlock>
  )
}
```

### 格式化输入内容

通过 `formatter` 属性可以对输入的内容进行格式化，通过 `format-trigger` 属性可以指定执行格式化的时机，默认在输入时进行格式化。

```tsx
import React, { useState } from 'react'
import { Field } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [value1, setValue1] = useState('')

  const formatter = (val: string | number) => (val as string).replace(/\d/g, '')

  return (
    <DemoBlock title='格式化输入内容' padding='12px 0'>
      <Field
        value={value1}
        label='文本'
        formatter={formatter}
        placeholder='输入时执行格式化'
        onChange={setValue1}
      />
    </DemoBlock>
  )
}
```

### 支持多种类型

通过 `type` 属性可以设置输入框的类型。

```tsx
import React, { useState } from 'react'
import { Field } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [digit, setDigit] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPasswrod] = useState('')

  return (
    <DemoBlock title='支持多种类型' padding='12px 0'>
      <Field
        value={digit}
        type='digit'
        label='整数'
        onChange={setDigit}
        placeholder='请输入整数'
      />
      <Field
        value={number}
        type='number'
        label='数字'
        onChange={setNumber}
        placeholder='请输入数字'
      />
      <Field
        value={password}
        type='password'
        label='密码'
        onChange={setPasswrod}
        placeholder='请输入密码'
      />
    </DemoBlock>
  )
}
```

### 高度自适应

对于 textarea，可以通过 `autoSize` 属性设置高度自适应。

```tsx
import React, { useState } from 'react'
import { Field } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [content, setContent] = useState('')

  return (
    <DemoBlock title='高度自适应' padding='12px 0'>
      <Field
        rows={1}
        value={content}
        onChange={setContent}
        label='留言'
        type='textarea'
        placeholder='请输入留言'
      />
    </DemoBlock>
  )
}
```

### 显示字数统计

设置 `maxLength` 和 `showWordLimit` 属性后会在底部显示字数统计。

```tsx
import React, { useState } from 'react'
import { Field } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [content, setContent] = useState('')

  return (
    <DemoBlock title='显示字数统计' padding='12px 0'>
      <Field
        rows={2}
        autoSize
        label='留言'
        type='textarea'
        placeholder='请输入留言'
        value={content}
        onChange={setContent}
        maxLength={50}
        showWordLimit
      />
    </DemoBlock>
  )
}
```

### 输入框内容对齐

通过 `align` 属性可以设置输入框内容的对齐方式，可选值为 `center`、`right`。

```tsx
import React from 'react'
import { Field } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <DemoBlock title='显示字数统计' padding='12px 0'>
      <Field label='文本' placeholder='输入框内容右对齐' align='right' />
    </DemoBlock>
  )
}
```

### ref 调用

通过 ref 可以获取到 Field 实例并调用实例方法。

```tsx
import React, { useRef } from 'react'
import { Field, Button } from '@kfe/mix-ui'
import type { FieldInstance } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const fieldRef = useRef<FieldInstance>(null)

  return (
    <DemoBlock title='ref 调用' padding='12px 0'>
      <Field
        center
        ref={fieldRef}
        placeholder='请输入'
        label='文本'
        suffix={
          <Button
            square
            style={{ width: '60px', margin: 0 }}
            onClick={() => {
              fieldRef?.current?.focus()
            }}
          >
            聚焦
          </Button>
        }
      />
    </DemoBlock>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前输入的值 | _number \| string_ | - |
| label | 输入框左侧文本 | _string_ | - |
| name | 名称，提交表单的标识符 | _string_ | - |
| type | 输入框类型, 可选值为 `digit`<br>`number` `textarea` `password` 等 | _string_ | `text` |
| maxLength | 输入的最大字符数 | _number \| string_ | - |
| placeholder | 输入框占位提示文字 | _string_ | - |
| border | 是否显示内边框 | _boolean_ | `true` |
| disabled | 是否禁用输入框 | _boolean_ | `false` |
| readOnly | 是否只读 | _boolean_ | `false` |
| colon | 是否在 label 后面添加冒号 | _boolean_ | `false` |
| intro | 额外的输入框提示信息 | _ReactNode_ | - |
| introClass | 输入框提示信息文本额外类名 | _any_ | - |
| tooltip | 字段提示信息 | _ReactNode \|_ [DialogProps & { icon: ReactNode }](/components/dialog#props) | - |
| required | 是否显示表单必填星号 | _boolean_ | `false` |
| center | 是否使内容垂直居中 | _boolean_ | `false` |
| clearable | 是否启用清除图标，点击清除图标后会清空输入框 | _boolean_ | `false` |
| clearIcon | 清除图标名称或图片链接 | _ReactNode_ | `<Clear />` |
| clearTrigger | 显示清除图标的时机，`always` 表示输入框不为空时展示，`focus` 表示输入框聚焦且不为空时展示 | FieldClearTrigger | `focus` |
| clickable | 是否开启点击反馈 | _boolean_ | `false` |
| isLink | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
| autoFocus | 是否自动聚焦，iOS 系统不支持该属性 | _boolean_ | `false` |
| showWordLimit | 是否显示字数统计，需要设置`maxLength`属性 | _boolean_ | `false` |
| error | 是否将输入内容标红 | _boolean_ | `false` |
| errorMessage | 底部错误提示文案，为空时不展示 | _string_ | - |
| formatter | 输入内容格式化函数 | _Function_ | - |
| formatTrigger | 格式化函数触发的时机，目前可选值仅有 `onChange` | _string_ | `onChange` |
| arrowDirection | 箭头方向，可选值为 `left` `up` `down` | _string_ | `right` |
| labelClass | 左侧文本额外类名 | _any_ | - |
| labelWidth | 左侧文本宽度，默认单位为`px` | _number \| string_ | `6.2em` |
| labelAlign | 左侧文本对齐方式，可选值为 `center` `right` | _string_ | `left` |
| controlAlign | 右侧输入控件容器的对齐方式，可选值为 `center` `right` | _string_ | `left` |
| errorMessageAlign | 错误提示文案对齐方式，可选值为 `center` `right` | _string_ | `left` |
| autoSize | 是否自适应内容高度，只对 textarea 有效，<br>可传入对象,如 `{ maxHeight: 100, minHeight: 50 }`，<br>单位为`px` | _boolean \| object_ | `false` |
| rows | 输入框行数，只对 textarea 有效 | _number_ | 2 |
| leftIcon | 左侧图标 | _ReactNode_ | - |
| rightIcon | 右侧图标 | _ReactNode_ | - |
| prefix | 自定义输入框前部内容 | _ReactNode_ | - |
| suffix | 自定义输入框尾部内容 | _ReactNode_ | - |

### Events

| 事件             | 说明                            | 回调参数                |
| ---------------- | ------------------------------- | ----------------------- |
| onChange         | 当值变化时触发                  | _val: string \| number_ |
| onFocus          | 输入框获得焦点时触发            | _event: MouseEvent_     |
| onBlur           | 输入框失去焦点时触发            | _event: MouseEvent_     |
| onClear          | 点击清除按钮时触发              | _event: MouseEvent_     |
| onClick          | 点击 Field 时触发               | _event: MouseEvent_     |
| onClickInput     | 点击输入区域时触发              | _event: MouseEvent_     |
| onClickLeftIcon  | 点击左侧图标时触发              | _event: MouseEvent_     |
| onClickRightIcon | 点击右侧图标时触发              | _event: MouseEvent_     |
| onOverlimit      | 当输入值超出 `maxLength` 时触发 | -                       |

### 方法

通过 ref 可以获取到 Field 实例并调用实例方法

| 方法名 | 说明           | 参数 | 返回值 |
| ------ | -------------- | ---- | ------ |
| focus  | 获取输入框焦点 | -    | -      |
| blur   | 取消输入框焦点 | -    | -      |

## 常见问题

### 设置 type 为 number 后，为什么 input 标签的类型仍为 text?

HTML 原生的 `type="number"` 属性在 iOS 和 Android 系统上都存在一定问题，比如 maxLength 属性不生效、无法获取到完整的输入内容等。因此设置 type 为 `number` 时，`Field` 不会使用原生的 `type="number"` 属性，而是用现代浏览器支持的 [inputmode 属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/inputmode)来控制输入键盘的类型。

### 在桌面端点击清除按钮无效？

清除按钮监听是的移动端 Touch 事件，参见[桌面端适配](/guide/advanced-usage)。