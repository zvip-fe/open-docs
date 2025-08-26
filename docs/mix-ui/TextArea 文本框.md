# TextArea 文本框

## 介绍

TextArea 文本框。

## 引入

```js
import { TextArea } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

```tsx
import React from 'react'
import { TextArea } from '@kfe/mix-ui'

export default () => {

  return (
    <TextArea
      style={{
        width: '90%',
        margin: '10px',
        border: '1px solid #ebebeb',
        borderRadius: '6px'
      }}
      autoSize={{ maxHeight: 100, minHeight: 50 }}
      placeholder='请输入文本'
      rows={3}
      showWordLimit
      maxLength={10}
    />
  )
}
```

### 显示字数统计

```tsx
import React from 'react'
import { TextArea } from '@kfe/mix-ui'

export default () => {

  return (
    <TextArea
      style={{
        width: '90%',
        margin: '10px',
        border: '1px solid #ebebeb',
        borderRadius: '6px'
      }}
      autoSize={{ maxHeight: 100, minHeight: 50 }}
      placeholder='请输入文本'
      showWordLimit
    />
  )
}
```

### 自适应内容高度

```tsx
import React from 'react'
import { TextArea } from '@kfe/mix-ui'

export default () => {

  return (
    <TextArea
      style={{
        width: '90%',
        margin: '10px',
        border: '1px solid #ebebeb',
        borderRadius: '6px'
      }}
      autoSize={{ maxHeight: 100, minHeight: 50 }}
      placeholder='请输入文本'
    />
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxLength | 最大字数 | _number_ | 无限制 |
| rows | 输入框行数 | _number_ | 2 |
| showWordLimit | 是否显示字数统计，支持自定义内容 | _boolean\|({ currentCount, maxLengh }) => ReactNode_ | `false` |
| autoSize | 是否自适应内容高度，可传入对象,如 `{ maxHeight: 100, minHeight: 50 }`，单位为`px` | _boolean \| object_ | `false` |