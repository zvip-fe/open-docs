# Lazyload 懒加载

## 介绍

当页面需要加载大量内容时，使用懒加载可以实现延迟加载页面可视区域外的内容，从而使页面加载更流畅。

## 引入

```js
import { Lazyload } from '@kfe/mix-ui';
```

## 代码演示

### 图片懒加载
将 Image 组件的 lazyload 属性设为 true 即可开启图片懒加载功能

```tsx
import React from 'react'
import { Image } from '@kfe/mix-ui'

const imageList = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
  'https://img.yzcdn.cn/vant/apple-5.jpg',
  'https://img.yzcdn.cn/vant/apple-6.jpg',
  'https://img.yzcdn.cn/vant/apple-7.jpg'
]

export default () => {
  return (
    <>
      {imageList.map((img) => (
        <Image lazyload src={img} key={img} />
      ))}
    </>
  )
}
```

### 组件懒加载
将需要懒加载的组件放在 Lazyload 组件中， 即可实现组件懒加载

```tsx
import React, { useEffect } from 'react'
import { Lazyload, Image } from '@kfe/mix-ui'

const LazyComponent = () => {
  useEffect(() => {
    console.log('lazy component mounted')
  }, [])
  return (
    <div>
      <Image src='https://img.yzcdn.cn/vant/apple-7.jpg' />
      当页面需要加载大量内容时，使用懒加载可以实现延迟加载页面可视区域外的内容，从而使页面加载更流畅。
    </div>
  )
}
export default () => {
  return (
    <>
      <Lazyload>
        <LazyComponent />
      </Lazyload>
    </>
  )
}
```

## API

### Image Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 占位容器类名 | _string_ | `` |
| height | 设置占位容器高度 | _number \| string_| `` |
| style | 占位容器样式 | _CSSProperties_ | `` |
| placeholder | 自定义占位容器视图 | _ReactNode_ | `` |