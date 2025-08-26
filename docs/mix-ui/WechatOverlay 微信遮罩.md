# WechatOverlay 微信遮罩

## 介绍

创建一个遮罩层，用于强调特定的页面元素，并阻止用户进行其他操作。

比如用来在微信中引导用户在打开浏览器

## 引入

```js
import { WechatOverlay } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

```tsx
import React, { useState } from 'react'
import { Button, WechatOverlay } from '@kfe/mix-ui'
export default () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button onClick={() => { setShow(true) }}>
        显示默认内容遮罩层
      </Button>
      <WechatOverlay visible={show} onClick={() => { setShow(false) }} />
    </>
  )
}
```

### 嵌入内容

```tsx
import React, { useState } from 'react'
import { Button, WechatOverlay } from '@kfe/mix-ui'
import './demo.less'

export default () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button onClick={() => { setShow(true) }}>
        自定义遮罩层的图片/文字样式
      </Button>
      <WechatOverlay
        visible={show}
        onClick={() => { setShow(false) }}
        imageUrl='https://i-1-lanrentuku.52tup.com/2020/9/9/bbe781de-352f-4bf8-9148-b7341f1037bf.png'
        tipContentList={['Step1 第一步第一步第一步', 'Step2 第二步第二步第二步']}
        className='wechat-overlay-demo'
      />
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
| imageUrl | 蒙层提示图片 url | _string_ | `https://picx.zhimg.com/v2-570e40c4534929fb2104ce0e9208032c.png` |
| tipContentList | 蒙层提示文本内容 | _array_ | `['Step1 点击右上角「 ... 」','Step2 选择「在浏览器中打开」']` |