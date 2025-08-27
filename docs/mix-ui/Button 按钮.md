# Button 按钮

## 介绍

按钮用于触发一个操作，如提交表单。

## 引入

```js
import { Button } from '@kfe/mix-ui';
```

## 代码演示

### 按钮类型

按钮支持 `default`、`primary`、`pay` 三种类型，默认为 `default`。可用于单个按钮展示，双按钮展示时，此为主按钮样式。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='按钮类型' padding='12px'>
      <div className='demo-button'>
        <Button type='primary'>会员色</Button>
        <Button type='pay'>购买红</Button>
        <Button type='default'>主题色</Button>
      </div>
    </DemoBlock>
  )
}
```

### 线面按钮

通过 `surface` 属性将按钮设置为线面按钮。仅用于双按钮展示时，此为次按钮样式。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='线面按钮' padding='12px'>
      <div className='demo-button'>
        <Button surface type='primary'>
          会员色
        </Button>
        <Button surface type='pay'>
          购买红
        </Button>
        <Button surface type='default'>
          主题色
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 描边按钮

通过 `stroke` 属性将按钮设置为描边按钮，仅用于单个按钮展示。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='描边按钮' padding='12px'>
      <div className='demo-button'>
        <Button stroke type='primary'>
          会员色
        </Button>
        <Button stroke type='pay'>
          购买红
        </Button>
        <Button stroke type='default'>
          主题色
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='禁用状态' padding='12px'>
      <div className='demo-button'>
        <Button disabled type='primary'>
          会员色
        </Button>
        <Button disabled type='pay'>
          购买红
        </Button>
        <Button disabled type='default'>
          主题色
        </Button>
        <Button disabled surface type='primary'>
          会员色
        </Button>
        <Button disabled surface type='pay'>
          购买红
        </Button>
        <Button disabled surface type='default'>
          主题色
        </Button>
        <Button disabled stroke type='primary'>
          会员色
        </Button>
        <Button disabled stroke type='pay'>
          购买红
        </Button>
        <Button disabled stroke type='default'>
          主题色
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 加载状态

通过 `loading` 属性设置按钮为加载状态，加载状态下默认会隐藏按钮文字，可以通过 `loadingText` 设置加载状态下的文字，也可以通过 `loadingSize` 和 `loadingColor` 设置加载图标的大小和颜色。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import './style.less'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <DemoBlock title='加载状态' padding='12px'>
      <div className='demo-button'>
        <Button loading type='primary' />
        <Button loading type='primary' loadingSize='12px' />
        <Button loading type='primary' loadingColor='#fff' />
        <Button loading loadingText='加载中...' type='primary' />
      </div>
    </DemoBlock>
  )
}
```

### 图标按钮

通过 `icon` 属性设置按钮图标，支持 Icon 组件里的所有图标。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
// 注意：需要替换为你项目中的图标库
// import { ArrowLeft12 } from 'your-icon-library'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  return (
    <DemoBlock title='图标按钮' padding='12px'>
      <div className='demo-button'>
        <Button icon={<ArrowLeft12 />} type='primary' />
        <Button icon={<ArrowLeft12 />} iconPosition='left' type='primary'>
          按钮
        </Button>
        <Button icon={<ArrowLeft12 />} iconPosition='right' type='primary'>
          按钮
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='块级元素' padding='12px'>
      <div className='demo-button'>
        <Button type='primary' block>
          块级元素
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 自定义颜色

通过 `color` 属性可以自定义按钮的颜色。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='自定义颜色' padding='12px'>
      <div className='demo-button'>
        <Button color='#7232dd'>单色按钮</Button>
        <Button color='#7232dd' stroke>
          单色按钮
        </Button>
        <Button color='linear-gradient(to right, #ff6034, #ee0a24)'>
          渐变色按钮
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 按钮形状

通过 `square` 设置方形按钮。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='按钮形状' padding='12px'>
      <div className='demo-button'>
        <Button square type='primary'>
          会员色
        </Button>
        <Button square type='pay'>
          购买红
        </Button>
        <Button square type='default'>
          主题色
        </Button>
      </div>
    </DemoBlock>
  )
}
```

### 按钮第二行文本

通过 `secondText` 属性可以自定义按钮第二行文本。

```tsx
import React from 'react'
import { Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='按钮第二行文本' padding='12px'>
      <div className='demo-button'>
        <Button type='primary' secondText='立即购买'>新会员首月仅 0.3 元/天</Button>
        <Button type='pay' secondText='立即购买'>新会员首月仅 0.3 元/天</Button>
        <Button type='default' secondText='立即购买'>新会员首月仅 0.3 元/天</Button>
      </div>
    </DemoBlock>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 类型，可选值为 `default` `primary` `pay` | _string_ | `default` |
| text | 按钮文字 | _string_ | - |
| secondText | 按钮第二行文本 | _string_ | - |
| color | 按钮颜色，支持传入 `linear-gradient` 渐变色 | _string_ | - |
| icon | 按钮 Icon | _ReactNode_ | - |
| iconPosition | 图标展示位置，可选值为 `right` | _string_ | `left` |
| block | 是否为块级元素 | _boolean_ | `false` |
| stroke | 是否为描边按钮 | _boolean_ | `false` |
| surface | 是否为线面按钮 | _boolean_ | `false` |
| square | 是否为方形按钮 | _boolean_ | `false` |
| disabled | 是否禁用按钮 | _boolean_ | `false` |
| loading | 是否显示为加载状态 | _boolean_ | `false` |
| loadingText | 加载状态提示文字 | _string_ | - |
| loadingColor | 加载图标颜色 | _string_ | `#999999` |
| loadingSize | 加载图标大小 | _string_ | `16px` |

### Events

| 事件名  | 说明                                     | 回调参数       |
| ------- | ---------------------------------------- | -------------- |
| onClick | 点击按钮，且按钮状态不为禁用时触发 | _event: Event_ |

### 类型定义

组件导出以下类型定义：

```js
import type { ButtonType } from '@kfe/mix-ui';
```