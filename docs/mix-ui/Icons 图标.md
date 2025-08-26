# Icons 图标

## 介绍

语义化的矢量图形，请根据项目需要选择合适的图标库。

使用经过 reiconify 处理的 React 组件，组件名为 IconNameSize 的形式。

## 引入

```js
import { ArrowClockwise24 } from '@kfe/mix-ui';
```

## 代码演示

### 基础使用

```tsx
import React from 'react'
import {
  ArrowClockwise24,
  ArrowClockwise16,
  ArrowDown24,
  ArrowDown16,
  ArrowSquarePathFill24,
  ArrowSquarePathFill16,
  Alipay24,
  CurrencyBubbleFill24,
  BadgeCgFill24
} from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <div>
      <DemoBlock title='24px'>
        <ArrowClockwise24 />
        <ArrowDown24 />
        <ArrowSquarePathFill24 />
        <Alipay24 />
        <CurrencyBubbleFill24 />
        <BadgeCgFill24 />
      </DemoBlock>

      <DemoBlock title='16px'>
        <ArrowClockwise16 />
        <ArrowDown16 />
        <ArrowSquarePathFill16 />
      </DemoBlock>
    </div>
  )
}
```

### 自定义

```tsx
import React from 'react'
import {
  ArrowClockwise24,
  Vip24
} from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <div>
      <DemoBlock title='图标大小'>
        <ArrowClockwise24 size={100} />
        <Vip24 size={120} />
      </DemoBlock>

      <DemoBlock title='图标颜色'>
        <ArrowClockwise24 color='red' />
      </DemoBlock>
    </div>
  )
}
```

## 图标列表

详情：[http://zhihu-design-icons.zhdocs.io/#/name](http://zhihu-design-icons.zhdocs.io/#/name)

```jsx
/**
 * hideActions: ["CSB"]
 * iframe: true
 * inline: true
 */
import React from 'react';

export default () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <iframe 
        width="100%"
        height="100%" 
        style={{
          margin: '-70px 0 0 -90px'
        }}
        src="http://zhihu-design-icons.zhdocs.io/#/name"
        frameBorder={0}
        scrolling='false'
      />
    </div>

  );
};
```