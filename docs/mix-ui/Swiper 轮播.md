# Swiper 轮播

## 介绍

用于循环播放一组图片或内容。

## 引入

```js
import { Swiper } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

每个 Swiper.Item 代表一张轮播卡片，可以通过 `autoplay` 属性设置自动轮播的间隔。

```tsx
import React from 'react'
import { Swiper } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import { items } from './items'

import './base.less'

export default () => {
  return (
    <DemoBlock title='基础用法' padding='0'>
      <div className='demo-swiper'>
        <Swiper autoplay={2000}>{items}</Swiper>
      </div>
    </DemoBlock>
  )
}
```

### 监听 onChange 事件

在每一页轮播结束后，会触发 `onChange` 事件。

```tsx
import React, { useState } from 'react'
import { Swiper } from '@kfe/mix-ui'
import { DemoBlock, DemoDescription } from 'demos'
import { items } from './items'

import './base.less'

export default () => {
  const [page, setPage] = useState(1)
  return (
    <DemoBlock title='监听 onChange 事件' padding='0'>
      <div className='demo-swiper'>
        <DemoDescription content={`当前是第${page}页`} />
        <Swiper onChange={(i) => setPage(+i + 1)}>{items}</Swiper>
      </div>
    </DemoBlock>

  )
}
```

### 纵向滚动

设置 `vertical` 属性后滑块会纵向排列，此时需要指定滑块容器的高度。

```tsx
import React from 'react'
import { Swiper } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import { items } from './items'

import './base.less'

export default () => {
  return (
    <DemoBlock title='纵向滚动' padding='0'>
      <div className='demo-swiper'>
        <Swiper autoplay={5000} vertical style={{ height: 150 }}>
          {items}
        </Swiper>
      </div>
    </DemoBlock>
  )
}
```

### 自定义滑块大小

滑块默认宽度为 `100%`，可以通过 `slideSize` 属性改变滑块宽度。

```tsx
import React from 'react'
import { Swiper } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import { items } from './items'

import './base.less'

export default () => {
  return (
    <DemoBlock title='自定义滑块大小' padding='0'>
      <div className='demo-swiper'>
        <Swiper slideSize={80}>{items}</Swiper>
      </div>
    </DemoBlock>
  )
}
```

### 滑块居中

通过 `trackOffset` 改变滑块偏移量实现居中展示。

```tsx
import React from 'react'
import { Swiper } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import { items } from './items'

import './base.less'

export default () => {
  return (
    <DemoBlock title='滑块居中' padding='0'>
      <div className='demo-swiper'>
        <Swiper slideSize={80} trackOffset={10}>
          {items}
        </Swiper>
      </div>
    </DemoBlock>
  )
}
```

### 垂直滑块居中

```tsx
import React from 'react'
import { Swiper } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import { items } from './items'

import './base.less'

export default () => {
  return (
    <DemoBlock title='垂直滑块居中' padding='0'>
      <div className='demo-swiper'>
        <Swiper style={{ height: 150 }} vertical slideSize={80} trackOffset={10}>
          {items}
        </Swiper>
      </div>
    </DemoBlock>
  )
}
```

### 自定义指示器

通过 `indicator` 属性可以自定义指示器的样式。

```tsx
import React from 'react'
import { Swiper } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import { items } from './items'

import './indicator.less'

export default () => {
  return (
    <DemoBlock title='自定义指示器' padding='0'>
      <div className='demo-swiper'>
        <Swiper
          indicator={(total, current) => (
            <div className='custom-indicator'>
              {+current + 1}/{total}
            </div>
          )}
        >
          {items}
        </Swiper>
      </div>
    </DemoBlock>
  )
}
```

## API

### Swipe Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoplay | 自动轮播间隔，单位为 ms | _number \| boolean_ | `false` |
| duration | 动画时长，单位为 ms | _number_ | `300` |
| initialSwipe | 初始位置索引值 | _number_ | `0` |
| loop | 是否开启循环播放 | _boolean_ | `true` |
| enabled | 是否启用 Swiper | _boolean_ | `true` |
| vertical | 是否为纵向滚动 | _boolean_ | `false` |
| touchable | 是否可以通过手势滑动 | _boolean_ | `true` |
| preventScroll | 是否阻止内部滚动行为 | _boolean_ | `true` |
| slideSize | 滑块的宽度百分比 | _number_ | `100` |
| trackOffset | 滑块轨道整体的偏移量百分比 | _number_ | `0` |
| rubberband | 是否在拖动超出内容区域时启用橡皮筋效果，仅在非 loop 模式下生效 | _boolean_ | `true` |
| stuckAtBoundary | 是否在边界两边卡住，避免出现空白，仅在非 `loop` 模式且 `slideSize` < 100 时生效 | _boolean_ | `false` |
| indicator | 自定义指示器 | _boolean \| (total, current) => ReactNode_ | - |
| indicatorProps | 指示器属性 | _IndicatorProps_ | - |
| onChange | 每一页轮播结束后触发 | _(index:当前页的索引) => void_ | - |
| lowcode | 低代码场景使用 | _boolean_ | - |

### IndicatorProps 格式

| 名称      | 说明       | 类型     |
| --------- | ---------- | -------- |
| className | 指示器类名 | _string_ |
| style     | 指示器样式 | _string_ |

### SwiperItem Events

| 事件名  | 说明       | 回调参数            |
| ------- | ---------- | ------------------- |
| onClick | 点击时触发 | _event: MouseEvent_ |

### Swiper 方法

通过 ref 可以获取到 Swiper 实例并调用实例方法。

| 方法名    | 说明                            | 参数            | 返回值 |
| --------- | ------------------------------- | --------------- | ------ |
| swipePrev | 切换到上一轮播                  | -               | -      |
| swipeNext | 切换到下一轮播                  | -               | -      |
| swipeTo   | 切换到指定位置                  | _index: number_ | -      |
| disable   | 禁用 Swiper（如果已启用）       | -               | -      |
| enable    | 动态启用 Swiper（如果已经禁用） | -               | -      |

### 类型定义

组件导出以下类型定义：

```ts
import type { SwiperInstance } from '@kfe/mix-ui';
```

`SwiperInstance` 是组件实例的类型，用法如下：

```ts
import { useRef } from 'react';
import type { SwiperInstance } from '@kfe/mix-ui';

const swipeRef = useRef<SwipeInstance>(null);

swipeRef.current?.swipeNext();
```