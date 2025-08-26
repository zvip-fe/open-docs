# Pag 动画工作流

## 介绍

[Portable Animated Graphics](https://pag.art/) 是一套完整的动效工作流解决方案。
目标是降低或消除动效相关的研发成本，能够一键将设计师在 AE（Adobe After Effects）中制作的动效内容导出成素材文件，并快速上线应用于几乎所有的主流平台。

## 引入

```js
import { Pag } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

通过 `src` 设置 pag 文件， `fallbackImageUrl` 设置兜底图片，支持 `autoplay`、`loop`、`progress`、`duration` 属性，均为可选配置。

```tsx
import React from 'react'
import { Pag } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  return (
    <DemoBlock title='基础用法' padding='12px'>
      <div className='demo-pag'>
        <Pag
          className='pag'
          src='https://example.com/your-static-resource.pag'
          fallbackImageUrl='https://pic1.zhimg.com/v2-8d56425bdcc498fa3b615fc8de57e0cb.png'
        />
      </div>
    </DemoBlock>
  )
}
```

### 实例方法调用

通过 ref 可以获取到 Pag 实例并调用实例方法。

```tsx
import React, { useRef } from 'react'
import { Pag, Button } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import type { PagInstance } from '@kfe/mix-ui'
import './style.less'

export default () => {
  const pagRef = useRef<PagInstance>(null)

  const handlePause = () => {
    if (pagRef.current?.pagView) {
      pagRef.current.pagView.pause()
    }
  }

  const handlePlay = () => {
    if (pagRef.current?.pagView) {
      pagRef.current.pagView.play()
    }
  }

  return (
    <DemoBlock title='实例方法调用' padding='12px'>
      <div className='demo-pag' onClick={handlePause}>
        <Pag
          className='pag'
          src='https://example.com/your-static-resource.pag'
          fallbackImageUrl='https://pic1.zhimg.com/v2-8d56425bdcc498fa3b615fc8de57e0cb.png'
          ref={pagRef}
        />
      </div>
      <Button onClick={handlePlay}>播放</Button>
      <Button onClick={handlePause}>暂停</Button>
    </DemoBlock>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | pag 文件链接 | _string_ | - |
| fallbackImageUrl | 兜底图片链接 | _string_ | - |
| autoplay | 是否自动播放 | _boolean_ | `true` |
| loop | 是否循环播放动画 | _boolean_ | `true` |
| progress | 播放起始点，取值范围为 0.0 到 1.0 | _number_ | `0` |
| duration | 单个动画播放时间（以微秒为单位） | _number_ | - |
| initialized | 初始化实例后的回调 | _Function_ | - |

### Pag 方法

通过 ref 可以获取到 Pag 实例并调用实例方法。

实例方法: https://pag.art/apis/web/classes/wechat_pag_view.PAGView.html

### 类型定义

通过 `PagInstance` 获取 Pag 实例的类型定义。

```ts
import { useRef } from 'react';
import type { PagInstance } from '@kfe/mix-ui';

const pagRef = useRef<PagInstance>(null);

pagRef.current?.play();
```