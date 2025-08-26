# Dialog 弹出框

## 介绍

弹出模态框，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。

弹出框组件支持函数调用和组件调用两种方式。

### 函数调用

Dialog 是一个函数，调用后会直接在页面中弹出相应的模态框。

```js
import { Dialog } from '@kfe/mix-ui';
```

## 代码演示

### 消息提示

用于提示一些消息，只包含一个确认按钮。

```tsx
import React from 'react'
import { Dialog, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  return (
    <DemoBlock title='消息提示' padding='12px'>
      <Button
        text='弹窗提示'
        onClick={() =>
          Dialog.show({
            title: '知乎',
            message: '有问题就会有答案',
            showCancelButton: true
          })
            .then((res) => {
              res ? console.log('confirm') : console.log('cancel')
            })}
      />
      <Button
        text='弹窗提示（无标题）'
        onClick={() =>
          Dialog.alert({
            message: '有问题就会有答案'
          }).then((res) => {
            console.log(res)
          })}
      />
      <Button
        text='确认弹框'
        onClick={() =>
          Dialog.confirm({
            title: '知乎',
            message: '有问题就会有答案'
          })
            .then((res) => {
              res ? console.log('confirm') : console.log('cancel')
            })}
      />
    </DemoBlock>
  )
}
```

### Promise 调用

Dialog 支持 promise

```tsx
import React from 'react'
import { Dialog, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  return (
    <DemoBlock title='Promise 调用' padding='12px'>
      <Button
        text='Dialog.alert'
        onClick={async () => {
          await Dialog.alert({
            title: '知乎',
            message: '有问题就会有答案'
          })
          console.log('confirm')
        }}
      />
      <Button
        text='Dialog.show'
        onClick={async () => {
          try {
            const res = await Dialog.show({
              title: '知乎',
              message: '有问题就会有答案',
              showCancelButton: true
            })
            res ? console.log('confirm') : console.log('cancel')
          } catch (error) {
            console.log('error')
          }
        }}
      />
    </DemoBlock>
  )
}
```

### 竖排按钮风格

将 theme 选项设置为 `vertical-button` 可以展示圆角按钮风格的弹窗。

```tsx
import React from 'react'
import { Dialog, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  return (
    <DemoBlock title='竖排按钮风格' padding='12px'>
      <Button
        text='竖排按钮弹窗'
        onClick={() =>
          Dialog.show({
            title: '知乎',
            message: '有问题就会有答案',
            theme: 'vertical-button',
            showCancelButton: true
          })}
      />
    </DemoBlock>
  )
}
```

### 自定义内容

通过 `children` 属性可以传入 `ReactNode`, 来自定义显示的内容。

```tsx
import React, { useState } from 'react'
import { Dialog, Button, Toast } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <DemoBlock title='自定义内容' padding='12px'>
      <Button
        text='自定义内容'
        onClick={() =>
          Dialog.show({
            title: '知乎',
            message: (
              <div style={{ color: 'blue' }}>
                有问题就会有答案
              </div>
            ),
            closeable: true,
            theme: 'vertical-button'
          })}
      />
      <Button
        text='自定义内容'
        onClick={() => setVisible(true)}
      />
      <Dialog
        visible={visible}
        title='知乎'
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      >
        <div style={{ color: 'blue', margin: '20px', textAlign: 'center' }}>
          有问题就会有答案
        </div>
      </Dialog>
    </DemoBlock>
  )
}
```

### 自定义按钮

通过 `confirmButtonText` 和 `cancelButtonText` 可以定义按钮文案，通过 `confirmButtonTextColor` 和 `cancelButtonTextColor` 可以定义按钮文案的颜色，通过 `confirmButtonColor` 和 `cancelButtonColor` 可以定义按钮背景色。

```tsx
import React from 'react'
import { Dialog, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  return (
    <DemoBlock title='自定义按钮' padding='12px'>
      <Button
        text='自定义按钮'
        onClick={() =>
          Dialog.alert({
            title: '知乎',
            confirmButtonColor: 'green'
          })}
      />
    </DemoBlock>
  )
}
```

也可以使用 `:global{}` 修改样式，eg:

```css
.dialog {
  &:global(.mu-popup) {
    background-color: blue;
  } 

  :global(.mu-dialog__confirm) {
    background-color: aqua;
    color: red;
  }
}
```

### 关闭弹出框

通过 `onConfirm` 和 `onCancel` 属性返回`Promise`函数，在弹窗关闭前进行特定操作。

```tsx
import React from 'react'
import { Dialog, Button, Toast } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  return (
    <DemoBlock title='关闭弹出框' padding='12px'>
      <Button
        text='完全关闭后的回调'
        onClick={() =>
          Dialog.alert({
            title: '知乎',
            message: '有问题会有答案',
            onClosed: () => console.log('onClosed')
          })}
      />
      <Button
        text='异步关闭'
        onClick={() =>
          Dialog.base({
            title: '知乎',
            message: '有问题就会有答案',
            showCancelButton: true,
            onCancel: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(false)
                  Toast.success({ message: '取消按钮异步' })
                }, 3000)
              })
            },
            onConfirm: () => {
              return new Promise(resolve => {
                setTimeout(() => {
                  resolve(true)
                  Toast.success({ message: '确认按钮异步' })
                }, 3000)
              })
            }
          })}
      />
    </DemoBlock>
  )
}
```

### 关闭按钮

通过 `closeable` 可以显示关闭按钮你，通过 `closeIcon` 可以自定义按钮内容。

```tsx
import React from 'react'
import { Dialog, Button } from '@kfe/mix-ui'
// 注意：需要替换为你项目中的图标库
// import { XmarkCircleFill24 } from 'your-icon-library'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  return (
    <DemoBlock title='关闭按钮' padding='12px'>
      <Button
        text='关闭按钮'
        onClick={() =>
          Dialog.show({
            title: '知乎',
            message: '有问题就会有答案',
            closeable: true
          })}
      />
      <Button
        text='自定义关闭按钮'
        onClick={() =>
          Dialog.show({
            title: '知乎',
            message: '有问题就会有答案',
            closeable: true,
            closeIcon: <XmarkCircleFill24 />
          })}
      />
    </DemoBlock>
  )
}
```

### 组件调用

如果需要在弹窗内嵌入组件或其他自定义内容，可以使用组件调用的方式。

```tsx
import React, { useState } from 'react'
import { Dialog, Button, Toast } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

import './style.less'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <DemoBlock title='组件调用' padding='12px'>
      <Button
        text='组件调用'
        onClick={() => setVisible(true)}
      />
      <Dialog
        visible={visible}
        title='知乎'
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}
      >
        <div style={{ color: 'blue', margin: '20px', textAlign: 'center' }}>
          有问题就会有答案
        </div>
      </Dialog>
    </DemoBlock>
  )
}
```

### 实例方法调用

通过 ref 可以获取到 Dialog 实例并调用实例方法。

<Alert type="info">
  注意，实例方法 show、hide 不要与 visible 属性混用。
</Alert>

```tsx
import React, { useRef } from 'react'
import { DialogInstanceType } from '../PropsType'
import { Dialog, Button, Toast } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const ref = useRef<DialogInstanceType>(null)

  const handleShow = () => {
    ref.current?.show()
  }

  const handleHide = () => {
    ref.current?.hide()
  }

  return (
    <DemoBlock title='实例方法调用' padding='12px'>
      <Button
        text='实例方法调用'
        onClick={() => handleShow()}
      />
      <Dialog
        ref={ref}
        title='知乎'
        showCancelButton
        onConfirm={() => {
          Toast.info('点击确认按钮')
          handleHide()
        }}
        onCancel={() => handleHide()}
        closeable
        closeIconPosition='bottom-center'
      >
        <div style={{ color: 'blue', margin: '20px', textAlign: 'center' }}>
          有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案有问题就会有答案
        </div>
      </Dialog>
    </DemoBlock>
  )
}
```

## API

### 方法

| 方法名         | 说明             | 参数      | 返回值            |
| -------------- | ---------------- | --------- | ----------------- |
| Dialog         | 弹窗组件         | `options` | `React.ReactNode` |
| Dialog.base    | 展示基础弹窗     | `options` | `void`         |
| Dialog.show    | 展示提示弹窗     | `options` | `Promise`         |
| Dialog.alert   | 展示消息提示弹窗 | `options` | `Promise`         |
| Dialog.confirm | 展示消息确认弹窗 | `options` | `Promise`         |

#### 注意

对于指令式创建出来的 `Dialog`，并不会感知父组件的重渲染和其中 `state` 的更新，因此下面这种写法是完全错误的：

```jsx | pure
export default function App() {
  const [captcha, setCaptcha] = useState('');
  const showCaptcha = () => {
    return Dialog.confirm({
      title: '短信验证',
      message: (
        <Field
          placeholder="请输入验证码"
          value={captcha} // App 中 captcha 的更新是不会传递到 Dialog 中的
          onChange={setCaptcha}
        />
      ),
    });
  };
  return <Button onClick={showCaptcha}>Show Dialog</Button>;
}
```

> 如果你需要在 `Dialog` 中包含很多复杂的状态和逻辑，那么可以使用**声明式**的语法，或者考虑自己将内部状态和逻辑单独封装一个组件出来([demo](https://stackblitz.com/edit/react-zwqkcs?file=src%2FApp.js))

### Props

通过函数调用 `Dialog` 时，支持传入以下选项：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示弹窗 | _boolean_ | - |
| title | 标题 | _string_ | - |
| width | 弹窗宽度，默认单位为`px` | _number \| string_ | `280px` |
| message | 文本内容，支持通过`\n`换行 | _string_ | - |
| messageAlign | 内容对齐方式，可选值为`left` `right` | _string_ | `center` |
| theme | 样式风格，可选值为`vertical-button` | _string_ | `default` |
| className | 自定义类名 | _any_ | - |
| showConfirmButton | 是否展示确认按钮 | _boolean_ | `true` |
| showCancelButton | 是否展示取消按钮 | _boolean_ | `false` |
| confirmButtonText | 确认按钮文案 | _string_ | `确定` |
| confirmButtonColor | 确认按钮颜色 | _string_ | `#056DE8` |
| confirmButtonTextColor | 确认按钮文案颜色 | _string_ | `#FFFFFF` |
| cancelButtonText | 取消按钮文案 | _string_ | `取消` |
| cancelButtonColor | 取消按钮颜色 | _string_ | `#EBEBEB` |
| cancelButtonTextColor | 取消按钮文案颜色 | _string_ | `#444444` |
| overlay | 是否展示遮罩层 | _boolean_ | `true` |
| overlayClass | 自定义遮罩层类名 | _string_ | - |
| overlayStyle | 自定义遮罩层样式 | _object_ | - |
| closeable | 是否展示关闭图标 | _boolean_ | `false` |
| closeOnPopstate | 是否在页面回退时自动关闭 | _boolean_ | `true` |
| closeOnClickOverlay | 是否在点击遮罩层后关闭弹窗 | _boolean_ | `false` |
| closeIconPosition | 关闭图标位置，可选值为`top-left`<br>`bottom-left` `bottom-right` `bottom-center` | _string_ | `top-right` |
| lockScroll | 是否锁定背景滚动 | _boolean_ | `true` |
| transition | 动画类名 [see](https://reactcommunity.org/react-transition-group/) | _string_ | - |
| onCancel | 点击取消按钮时触发 | _Function_ | - |
| onConfirm | 点击确认按钮时触发 | _Function_ | - |
| onClose | Dialog 关闭时的回调 | _Function_ | - |
| onClosed | Dialog 完全关闭时的回调 | _Function_ | - |
| teleport | 指定挂载的节点 | _HTMLElement \| () => HTMLElement_ | `body` |
| footer | 自定义底部按钮区域 | _ReactNode_ | - |

### 实例方法

通过 ref 可以获取到 Dialog 实例并调用实例方法。

<Alert type="info">
  注意，实例方法 show、hide 不要与 visible 属性混用。
</Alert>

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| show | 展示弹出框 | - | - |
| hide | 隐藏弹出框 | - | - |