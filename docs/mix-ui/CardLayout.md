# CardLayout

## 介绍

通用卡片容器

## 引入

```js
import { CardLayout } from '@kfe/mix-ui';
```

## 代码演示

### 内容加载

自定义内容加载

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { CardLayout } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock background='#f6f8fc' title='自定义内容' padding='12px'>
      <CardLayout>CardLayout1</CardLayout>
      <CardLayout>CardLayout2</CardLayout>
      <CardLayout>CardLayout3</CardLayout>
    </DemoBlock>
  )
}
```

### 事件

| 事件名  | 说明       | 回调参数            |
| ------- | ---------- | ------------------- |
| onClick | 点击时触发 | _event: MouseEvent_ |