# Overlay 遮罩

## 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

## 引入

```js
import { Overlay } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

```tsx
import React, { useState } from 'react'
import { Button, Overlay } from '@kfe/mix-ui'

export default () => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => setShow(true)}>
        显示遮罩层
      </Button>
      <Overlay visible={show} onClick={() => setShow(false)} />
    </>
  )
}
```

### 嵌入内容

```tsx
import React, { useState } from 'react'
import { Button, Overlay } from '@kfe/mix-ui'

export default () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)}>
        嵌入内容
      </Button>
      <Overlay visible={visible} onClick={() => setVisible(false)}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: 120, height: 120, backgroundColor: '#fff', borderRadius: 4 }} />
        </div>
      </Overlay>
    </>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否展示遮罩层 | _boolean_ | `false` |
| zIndex | z-index 层级 | _number \| string_ | `1` |
| duration | 动画时长，单位毫秒 | _number \| string_ | `0.3` |
| className | 自定义类名 | _string_ | - |
| customStyle | 自定义样式 | _object_ | - |
| lockScroll | 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动 | _boolean_ | `true` |