# Page 页面布局

## 介绍

设置距离视窗底部的位置, 可以对正常组件都生效, 不影响组件自身的样式。

## 引入

```js
import { Page } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

```tsx
import React from 'react'
import { Page } from '@kfe/mix-ui'

export default () => {

  return (
    <Page
      style={{ fontSize: '16px', color: '#F3BB6C' }}
      backgroundColor='#056DE8'
    >
      <div>内容</div>
    </Page>
  )
}
```

### 相对某个元素控制吸底

```tsx
import React, { useRef } from 'react'
import { Button, Page } from '@kfe/mix-ui'

export default () => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  return (
    <Page style={{ fontSize: '16px' }}>
      <div style={{ height: '20vh' }} />
      <div ref={wrapperRef}>目标 DOM</div>
      <div style={{ height: '50vh' }} />
      <Page.Footer
        bottom='40px'
        onFixedChange={(isFixed: any): void => {
          console.log(`是否吸底: ${isFixed}`)
        }}
        targetElement={wrapperRef}
        style={{ width: '200px', height: '40px' }}
      >
        <Button>
          吸底浮层按钮
        </Button>
      </Page.Footer>
      <div style={{ height: '150vh' }} />
    </Page>
  )
}
```

## API

### Page Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| backgroundColor | 背景颜色 | _string_ | - |
| onMounted | 组件加载回调 | _function_  | - |

### Page.Footer Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| alwaysFixed | 是否一直吸底 | _boolean_ | `false` |
| zIndex | z-index 层级 | _number \| string_ | `999` |
| bottom | 吸底距离 | _number \| string_ | `0` |
| targetElement | 目标元素消失的时候会触发 onFixedChange | _element_ | - |
| onFixedChange | 吸底状态回调 | _function_  | - |
| safeAreaInsetBottom | 是否适配底部安全区 | _boolean_ | `false` |