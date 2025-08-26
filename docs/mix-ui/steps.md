## Steps 步骤条

## 介绍

用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。

## 引入

```js
import { Steps } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

```tsx
import React, { useState } from 'react'
import { Steps, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [active, setActive] = useState(1)
  const nextStep = () => setActive((prev) => (prev >= 3 ? 0 : prev + 1))
  return (
    <DemoBlock title='相邻组件水平间距' padding='12px'>
      <Steps active={active}>
        <Steps.Item>买家下单</Steps.Item>
        <Steps.Item>商家接单</Steps.Item>
        <Steps.Item>买家提货</Steps.Item>
        <Steps.Item>交易完成</Steps.Item>
      </Steps>
      <div style={{ padding: 20 }}>
        <Button onClick={nextStep}>
          下一步
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 自定义样式

可以通过 `activeIcon` 和 `activeColor` 属性设置激活状态下的图标和颜色。

```tsx
import React, { useState } from 'react'
import { Steps, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [active, setActive] = useState(1)
  const nextStep = () => setActive((prev) => (prev >= 3 ? 0 : prev + 1))
  return (
    <DemoBlock>
      <Steps active={active} activeIcon={<div>!</div>} activeColor='#3f45ff'>
        <Steps.Item>买家下单</Steps.Item>
        <Steps.Item>商家接单</Steps.Item>
        <Steps.Item>买家提货</Steps.Item>
        <Steps.Item>交易完成</Steps.Item>
      </Steps>
      <div style={{ padding: 20 }}>
        <Button onClick={nextStep}>
          下一步
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 竖向步骤条

可以通过设置 `direction` 属性来改变步骤条的显示方向。

```tsx
import React, { useState } from 'react'
import { Steps, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [active, setActive] = useState(1)
  const nextStep = () => setActive((prev) => (prev >= 2 ? 0 : prev + 1))
  return (
    <DemoBlock>
      <Steps direction='vertical' active={active}>
        <Steps.Item>
          <p style={{ lineHeight: 1 }}>【城市】物流状态1</p>
          <p style={{ marginTop: '3px' }}>2016-07-12 12:40</p>
        </Steps.Item>
        <Steps.Item>
          <p style={{ lineHeight: 1 }}>【城市】物流状态2</p>
          <p style={{ marginTop: '3px' }}>2016-07-11 10:00</p>
        </Steps.Item>
        <Steps.Item>
          <p style={{ lineHeight: 1 }}>快件已发货</p>
          <p style={{ marginTop: '3px' }}>2016-07-10 09:30</p>
        </Steps.Item>
      </Steps>
      <div style={{ padding: 20 }}>
        <Button onClick={nextStep}>
          下一步
        </Button>
      </div>
    </DemoBlock>

  )
}
```

## API

### Steps Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前步骤对应的索引值 | _number \| string_ | `0` |
| direction | 步骤条方向，可选值为 `vertical` | _string_ | `horizontal` |
| activeIcon | 当前步骤对应的底部图标 | _ReactNode_ | `<Checked />` |
| inactiveIcon | 非当前步骤对应的底部图标 | _ReactNode_ | - |
| finishIcon | 已完成步骤对应的底部图标，优先级高于 `inactiveIcon` | _ReactNode_ | - |
| activeColor | 当前步骤和已完成步骤的颜色 | _string_ | `#07c160` |
| inactiveColor | 未激活步骤的颜色 | _string_ | `#969799` |

### Steps.Item Props

| 参数         | 说明                 | 类型        | 默认值 |
| ------------ | -------------------- | ----------- | ------ |
| activeIcon   | 支持自定义激活图标   | _ReactNode_ | -      |
| inactiveIcon | 支持自定义非激活图标 | _ReactNode_ | -      |
| finishIcon   | 支持自定义已完成图标 | _ReactNode_ | -      |

### Steps Events

| 事件名      | 说明                       | 回调参数        |
| ----------- | -------------------------- | --------------- |
| onClickStep | 点击步骤的标题或图标时触发 | _index: number_ |