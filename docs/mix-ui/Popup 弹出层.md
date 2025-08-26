# Popup 弹出层

## 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

## 引入

```js
import { Popup } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

通过 `visible` 以及 `onClose` 控制弹出层是否展示。

```tsx
import React, { useState } from 'react'
import { Button, Popup } from '@kfe/mix-ui'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>展示弹出层</Button>
      <Popup
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      >
        <div style={{ padding: '30px 50px' }}>内容</div>
      </Popup>
    </>
  )
}
```

### 弹出位置

通过 `position` 属性设置弹出位置，默认居中弹出，可以设置为 `top`、`bottom`、`left`、`right`。

```tsx
import React, { useState } from 'react'
import { Button, Popup, PopupPosition } from '@kfe/mix-ui'

export default () => {
  const [state, setState] = useState<PopupPosition>('')

  const onClose = () => setState('')

  return (
    <>
      <Button onClick={() => setState('top')}>顶部弹出</Button>
      <Button onClick={() => setState('bottom')}>底部弹出</Button>
      <Button onClick={() => setState('left')}>左侧弹出</Button>
      <Button onClick={() => setState('right')}>右侧弹出</Button>

      <Popup
        visible={state === 'top'}
        style={{ height: '30%' }}
        position='top'
        onClose={onClose}
      />
      <Popup
        visible={state === 'bottom'}
        style={{ height: '30%' }}
        position='bottom'
        onClose={onClose}
      />
      <Popup
        visible={state === 'left'}
        style={{ width: '30%', height: '100%' }}
        position='left'
        onClose={onClose}
      />
      <Popup
        visible={state === 'right'}
        style={{ width: '30%', height: '100%' }}
        position='right'
        onClose={onClose}
      />
    </>
  )
}
```

### 关闭图标

设置 `closeable` 属性后，会在弹出层的右上角显示关闭图标，并且可以通过 `closeIcon` 属性自定义图标，使用 `closeIconPosition` 属性可以自定义图标位置。

```tsx
// 注意：需要替换为你项目中的图标库
// import { AntcreditPay24 } from 'your-icon-library'
import React, { useState } from 'react'
import { Button, Popup } from '@kfe/mix-ui'

export default () => {
  const [showCloseIcon, setShowCloseIcon] = useState(false)
  const [showCustomCloseIcon, setShowCustomCloseIcon] = useState(false)
  const [showCustomIconPosition, setShowCustomIconPosition] = useState(false)
  const [showBottomIconPosition, setShowBottomIconPosition] = useState(false)

  return (
    <>
      <Button onClick={() => setShowCloseIcon(true)}>关闭图标</Button>
      <Button
        onClick={() => setShowCustomCloseIcon(true)}
      >自定义关闭图标
      </Button>
      <Button
        onClick={() => setShowCustomIconPosition(true)}
      >图标位置
      </Button>
      <Button
        onClick={() => setShowBottomIconPosition(true)}
      >图标显示在底部
      </Button>
      <Popup
        visible={showCloseIcon}
        closeable
        style={{ height: '30%' }}
        position='bottom'
        onClose={() => setShowCloseIcon(false)}
      />
      <Popup
        visible={showCustomCloseIcon}
        closeable
        style={{ height: '30%' }}
        position='bottom'
        closeIcon={<AntcreditPay24 />}
        onClose={() => setShowCustomCloseIcon(false)}
      />
      <Popup
        visible={showCustomIconPosition}
        closeable
        style={{ height: '30%' }}
        position='bottom'
        closeIconPosition='top-left'
        onClose={() => setShowCustomIconPosition(false)}
      />
      <Popup
        visible={showBottomIconPosition}
        closeable
        style={{ height: '50%', width: '50%' }}
        position='center'
        closeIconPosition='bottom-center'
        onClose={() => setShowBottomIconPosition(false)}
      >
        <div style={{ overflowY: 'scroll', height: '100%' }}>
          欢迎你（以下简称「你」或「用户」）参与由知乎、盐言故事发起的「盐选会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。
          欢迎你（以下简称「你」或「用户」）参与由知乎、盐言故事发起的「盐选会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。
          欢迎你（以下简称「你」或「用户」）参与由知乎、盐言故事发起的「盐选会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。
          欢迎你（以下简称「你」或「用户」）参与由知乎、盐言故事发起的「盐选会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。
          欢迎你（以下简称「你」或「用户」）参与由知乎、盐言故事发起的「盐选会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。
          欢迎你（以下简称「你」或「用户」）参与由知乎、盐言故事发起的「盐选会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。
          欢迎你（以下简称「你」或「用户」）参与由知乎、盐言故事发起的「盐选会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。
          欢迎你（以下简称「你」或「用户」）参与由知乎、盐言故事发起的「盐选会员狂欢节」活动，请详细阅读活动规则及相关条款。凡参与本次活动，均视为你已阅读、理解并同意本活动规则与免责声明的全部内容。
        </div>
      </Popup>
    </>
  )
}
```

### 圆角弹窗

设置 `round` 属性后，弹窗会根据弹出位置添加不同的圆角样式。

```tsx
import React, { useState } from 'react'
import { Button, Popup } from '@kfe/mix-ui'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>圆角弹窗</Button>
      <Popup
        visible={visible}
        closeable
        style={{ height: '30%' }}
        position='bottom'
        round
        onClose={() => setVisible(false)}
      />
    </>
  )
}
```

### 标题弹窗

设置 `title` 和 `description` 属性后，弹窗会显示标题和描述文字，建议在 `bottom` 弹框下使用。

```tsx
import React, { useState } from 'react'
import { Button, Popup } from '@kfe/mix-ui'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>标题弹框</Button>
      <Popup
        visible={visible}
        closeable
        title='标题'
        description='这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述'
        style={{ height: '30%' }}
        position='bottom'
        round
        onClose={() => setVisible(false)}
      />
    </>
  )
}
```

### ConfigProvider 配置

通过设置 `teleport` 属性，弹窗会挂载在指定的节点下，`ConfigProvider` 即可生效。

```tsx
import React from 'react'
import { Button, Popup } from '@kfe/mix-ui'

export default () => {
  const [visible, setVisible] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  return (
    <div ref={wrapperRef} className='popup-teleport-demo'>
      <Button
        onClick={() => setVisible(true)}
      >点击
      </Button>
      <Popup
        teleport={() => wrapperRef.current}
        visible={visible}
        closeable
        title='标题'
        description='这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述这是一段很长很长的描述'
        style={{ height: '30%' }}
        position='bottom'
        round
        onClose={() => setVisible(false)}
      />
    </div>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示弹出层 | _boolean_ | `false` |
| className | popup 类名 | _boolean_ | - |
| overlay | 是否显示遮罩层 | _boolean_ | `true` |
| position | 弹出位置，可选值为 `top` `bottom` `right` `left` | _string_ | `center` |
| overlayClass | 自定义遮罩层类名 | _string_ | - |
| overlayStyle | 自定义遮罩层样式 | _object_ | - |
| duration | 动画时长，单位秒 | _number \| string_ | `0.3` |
| round | 是否显示圆角 | _boolean_ | `false` |
| title | 弹出层标题 | _string_ | - |
| description | 弹出层描述 | _string | ReactNode_ | - |
| lockScroll | 是否锁定背景滚动 | _boolean_ | `true` |
| destroyOnClose | 关闭时销毁 Popup 里的子元素 | _boolean_ | `false` |
| closeOnPopstate | 是否在页面回退时自动关闭 | _boolean_ | `false` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭 | _boolean_ | `true` |
| closeable | 是否显示关闭图标 | _boolean_ | `false` |
| closeIcon | 关闭图标名称或图片链接 | _string_ | `cross` |
| closeIconPosition | 关闭图标位置，可选值为`top-left`<br>`bottom-left` `bottom-right` `bottom-center` | _string_ | `top-right` |
| transition | 动画类名，等价于 [transition](https://v3.cn.vuejs.org/api/built-in-components.html#transition) 的`name`属性 | _string_ | - |
| teleport | 指定挂载的节点 | _HTMLElement\|(() => HTMLElement)_ | - |
| safeAreaInsetBottom | 是否开启[底部安全区适配](/guide/advanced-usage) | _boolean_ | `false` |

### Events

| 事件名           | 说明                       | 回调参数       |
| ---------------- | -------------------------- | -------------- |
| onClick          | 点击弹出层时触发           | _event: Event_ |
| onClickOverlay   | 点击遮罩层时触发           | -              |
| onClickCloseIcon | 点击关闭图标时触发         | _event: Event_ |
| onOpen           | 打开弹出层时触发           | -              |
| onClose          | 关闭弹出层时触发           | -              |
| onOpened         | 打开弹出层且动画结束后触发 | -              |
| onClosed         | 关闭弹出层且动画结束后触发 | -              |

### 类型定义

组件导出以下类型定义：

```ts
import type { PopupPosition, PopupCloseIconPosition } from '@kfe/mix-ui';
```