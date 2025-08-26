# Toast 轻提示

## 介绍

在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

## 引入

```js
import { Toast } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

```tsx
import React from 'react'
import { Toast, Button } from '@kfe/mix-ui'
import './index.less'

export default () => {
  return (
    <>
      <Button type='default' onClick={() => Toast.info('<span class="demo-content">这是一个成功提示消息</span>')}>文字提示</Button>
      <Button type='default' onClick={() => Toast.success('成功文案')}>成功提示</Button>
      <Button type='default' onClick={() => Toast.fail('失败文案')}>失败提示</Button>
    </>
  )
}
```

### 动态更新提示

执行 Toast 方法时会返回对应的 Toast 实例，通过修改实例上的 message 属性可以实现动态更新提示的效果。

```tsx
import React from 'react'
import { Toast, Button } from '@kfe/mix-ui'

let timer: NodeJS.Timeout | undefined

export default () => {
  const onDynicUpdate = () => {
    let remain = 4
    const update = Toast.info({
      message: `还剩 ${remain + 1} 秒`,
      duration: 5000,
      onClose: () => {
        clearInterval(timer)
      }
    })
    timer = setInterval(() => {
      update.config({ message: `还剩 ${remain--} 秒` })
    }, 1000)
  }

  return (
    <>
      <Button type='default' onClick={onDynicUpdate}>动态更新提示</Button>
    </>
  )
}
```

### 自定义图标

通过 `icon` 选项可以自定义图标。

```tsx
// 注意：需要替换为你项目中的图标库
// import { Alipay24 } from 'your-icon-library'
import React from 'react'
import { Toast, Button } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Button
        type='default'
        onClick={() =>
          Toast({
            message: '自定义图标',
            duration: 2000000,
            icon: <Alipay24 />
          })}
      >自定义图标
      </Button>

      <Button
        type='default'
        onClick={() =>
          Toast({
            message: '自定义图片',
            icon: (
              <img width={36} src='https://picx.zhimg.com/v2-cef081f725dc7c9ad8c82aaf66b3327f.png' />
            )
          })}
      >自定义图片
      </Button>
    </>
  )
}
```

### 自定义位置

Toast 默认渲染在屏幕顶部，通过 `position` 属性可以控制 Toast 展示的位置。

```tsx
import React from 'react'
import { Toast, Button } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Button
        type='default'
        onClick={() =>
          Toast({
            message: '顶部展示',
            position: 'top'
          })}
      >顶部展示
      </Button>
      <Button
        type='default'
        onClick={() =>
          Toast({
            message: '底部展示',
            position: 'bottom'
          })}
      >底部展示
      </Button>
    </>
  )
}
```

### 动态更新提示

执行 Toast 方法时会返回对应的 Toast 实例，通过修改实例上的 `message` 属性可以实现动态更新提示的效果。

```js
let remain = 4;
let timer;
const toast = Toast.info({
  message: `还剩 ${remain + 1} 秒`,
  duration: 5000,
  onClose: () => clearInterval(timer),
});
timer = setInterval(() => {
  toast.config({ message: `还剩 ${remain--} 秒` });
}, 1000);
```

### 单例模式

Toast 默认采用单例模式，即同一时间只会存在一个 Toast，如果需要在同一时间弹出多个 Toast，可以参考下面的示例：

```tsx
import React from 'react'
import { Toast, Button } from '@kfe/mix-ui'

export default () => {
  return (
    <>
      <Button
        type='default'
        onClick={() => {
          Toast.allowMultiple(true)
        }}
      >
        点击开启
      </Button>
      <Button
        type='default'
        onClick={() => {
          Toast.allowMultiple(false)
        }}
      >
        点击关闭
      </Button>
      <Button
        type='default'
        onClick={() =>
          Toast({
            message: '第一个Toast'
          })}
      >第一个Toast
      </Button>
      <Button
        type='default'
        onClick={() =>
          Toast({
            message: '第二个Toast'
          })}
      >第二个Toast
      </Button>
    </>
  )
}
```

### 修改默认配置

通过 `Toast.setDefaultOptions` 函数可以全局修改 Toast 的默认配置。

```js
Toast.setDefaultOptions({ duration: 2000 });

Toast.resetDefaultOptions();

```

## API

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| Toast | 展示提示 | `options \| message` | toast 实例 |
| Toast.info | 展示文字提示 | `options \| message` | toast 实例 |
| Toast.success | 展示成功提示 | `options \| message` | toast 实例 |
| Toast.fail | 展示失败提示 | `options \| message` | toast 实例 |
| Toast.clear | 关闭提示 | `clearAll: boolean` | `void` |
| Toast.allowMultiple | 允许同时存在多个 Toast | - | `void` |
| Toast.setDefaultOptions | 修改默认配置，对所有 Toast 生效。<br>传入 type 可以修改指定类型的默认配置 | `type \| options` | `void` |
| Toast.resetDefaultOptions | 重置默认配置，对所有 Toast 生效。<br>传入 type 可以重置指定类型的默认配置 | `type` | `void` |

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 提示类型，可选值为 `success` `fail` `info` | _string_ | `info` |
| position | 位置，可选值为 `top` `bottom` | _string_ | `middle` |
| message | 文本内容，支持通过`<br />`换行 | _string_ | `''` |
| icon | 自定义图标 | _ReactNode_ | - |
| iconSize | 图标大小，如 `20px`，默认单位为 `px` | _number \| string_ | `36px` |
| forbidClick | 是否禁止背景点击 | _boolean_ | `false` |
| closeOnClick | 是否在点击后关闭 | _boolean_ | `false` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭 | _boolean_ | `false` |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | _number_ | `2000` |
| className | 自定义类名 | _string_ | - |
| overlay | 是否显示背景遮罩层 | _boolean_ | `false` |
| overlayClass | 自定义遮罩层类名 | _string_ | - |
| overlayStyle | 自定义遮罩层样式 | _object_ | - |
| onOpened | 完全展示后的回调函数 | _Function_ | - |
| onClose | 关闭时的回调函数 | _Function_ | - |
| transition | 动画类名 | _string_ | `mu-fade` |
| teleport | 指定挂载的节点 | _HTMLElement_ _(() => HTMLElement))_ | `document.body` |

### 类型定义

组件导出以下类型定义：

```js
import type { ToastType, ToastOptions, ToastPosition } from '@kfe/mix-ui';
```