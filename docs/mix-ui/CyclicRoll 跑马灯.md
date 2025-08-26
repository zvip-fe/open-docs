# CyclicRoll 跑马灯

## 介绍

无限循环滚动。

## 引入

```js
import { CyclicRoll } from '@kfe/mix-ui';
```

## 代码演示

### 滚动方向

滚动支持 `vertical`、`horizon` 两种类型，默认为 `vertical`。

```tsx
import React from 'react'
import { CyclicRoll } from '@kfe/mix-ui'
import './cyclicRoll.less'

export default () => {
  return (
    <>
      <p>横向滚动</p>
      <CyclicRoll speed={500} direction='horizon' className='mu-cyclic-roll-demo mu-cyclic-roll-demo-horizon' style={{ color: 'blue' }}>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </CyclicRoll>
      <p>纵向滚动</p>
      <CyclicRoll className='mu-cyclic-roll-demo' speed={30} direction='vertical'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </CyclicRoll>
    </>

  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 类型，可选值为 `vertical` ( 垂直 ) 、`horizon` ( 水平 ) | _string_ | `vertical` |
| speed | 滚动的速度「 列表滚动的总时间(s) =（ 横向：列表滚动长度 \| 水平：列表的宽度 ）/ speed 」，值越大滚动越快。为 0 时不滚动 | _number_ | 0 |

### Events

| 事件名  | 说明                                     | 回调参数       |
| ------- | ---------------------------------------- | -------------- |
| 无 |

### 类型定义

组件导出以下类型定义：

```js
import type { rollDirectionType, CyclicRollProps } from '@kfe/mix-ui';
```