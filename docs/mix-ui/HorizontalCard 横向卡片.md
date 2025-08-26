# HorizontalCard 横向卡片

## 介绍

最基础的横向卡片容器，可承载文字、图片、段落。

## 引入

```js
import { HorizontalCard } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

标题、内容展示

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { HorizontalCard } from '@kfe/mix-ui'

export default () => {
  return (
    <DemoBlock background='#f6f8fc' title='自定义内容'>
      <HorizontalCard title='标题'>
        自定义内容
      </HorizontalCard>
    </DemoBlock>
  )
}
```

### 有图卡片

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { HorizontalCard, Image } from '@kfe/mix-ui'
import './index.less'

export default () => {
  return (
    <DemoBlock background='#f6f8fc' title='自定义内容'>
      <HorizontalCard
        title='标题'
        cover={
          <div className='horizontal-card-demos-img-wrap'>
            <Image
              className='horizontal-card-demos-img'
              src='https://picx.zhimg.com/v2-ec0cf4fcff7aa1db67b14566e55b7842.jpg?source=320ce2a5'
              showLoading={false}
            />
          </div>
        }
      >
        自定义内容
      </HorizontalCard>
    </DemoBlock>
  )
}
```

### Meta 应用 

一种支持封面、标题和描述信息的卡片。

```tsx
import React from 'react'
import { DemoBlock } from 'demos'
import { HorizontalCard, Image } from '@kfe/mix-ui'
import './index.less'

const { Meta } = HorizontalCard

export default () => {
  return (
    <DemoBlock background='#f6f8fc' title='自定义内容'>
      <HorizontalCard
        title='标题'
        cover={
          <div className='demo-horizontal-card-img-wrap'>
            <Image
              className='demo-horizontal-card-img'
              src='https://picx.zhimg.com/v2-ec0cf4fcff7aa1db67b14566e55b7842.jpg?source=320ce2a5'
            />
          </div>
        }
      >
        <Meta
          title='分公'
          description='作者。'
          image='https://picx.zhimg.com/v2-ec0cf4fcff7aa1db67b14566e55b7842.jpg?source=320ce2a5'
        />
      </HorizontalCard>
    </DemoBlock>
  )
}
```

### HorizontalCard Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cover | 卡片封面 | _React.ReactNode_ | - |
| title | 卡片标题 | _React.ReactNode_ | - |
| className | 类名 | _string_ | - |
| style | style | _React.CSSProperties_ | - |

### HorizontalCard.Meta Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 描述内容 | _React.ReactNode_ | - |
| image | 图片 | _React.ReactNode_ | - |