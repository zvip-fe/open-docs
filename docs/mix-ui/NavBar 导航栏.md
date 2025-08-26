# NavBar 导航栏

## 介绍

为页面提供导航功能，常用于页面顶部。



，注：还未实现全部规范功能。

## 引入

```js
import { NavBar } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

```tsx
import React from 'react'
import { NavBar } from '@kfe/mix-ui'
import { DemoBlock, DemoDescription } from 'demos'

export default () => {
  return (
    <>
      <NavBar
        showLeftBack
        title='标题'
        leftText='返回'
        rightText='按钮'
        onClickLeft={() => alert('返回')}
        onClickRight={() => alert('按钮')}
        style={{ zIndex: 2 }}
      />

      <DemoBlock title='取消固定在顶部' padding='0'>
        <NavBar
          fixed={false}
          title='标题'
        />
      </DemoBlock>

      <DemoDescription content='上滑可查看顶部固定效果' />
      <div style={{ height: '100vh' }} />
    </>
  )
}
```

### 自定义内容

自定义导航栏两侧的内容。

```tsx
import React from 'react'
import { NavBar, Search16, Vip24 } from '@kfe/mix-ui'

export default () => {
  return (
    <NavBar
      showLeftBack
      title='标题'
      leftText={<Vip24 />}
      rightText={<Search16 />}
      onClickLeft={() => alert('vip')}
      onClickRight={() => alert('点击了搜索')}
    />
  )
}
```

### 仅知乎端内展示

```tsx
import React from 'react'
import { DemoBlock, DemoDescription } from 'demos'
import { NavBar, ConfigProvider } from '@kfe/mix-ui'

const Child = () => {
  return (
    <>
      <DemoDescription content='onlyZhihuShow: true' />
      <NavBar
        onlyZhihuShow
        fixed={false}
        title='仅知乎端内会展示我'
      />

      <DemoDescription content='onlyZhihuShow: false' />
      <NavBar
        onlyZhihuShow={false}
        fixed={false}
        title='无论是否端内都会展示我'
      />
    </>
  )
}

export default () => {
  return (
    <>
      <DemoBlock title='知乎端内模拟 ua.Zhihu = true' padding='0'>
        <ConfigProvider ua={{ Zhihu: true }}>
          <Child />
        </ConfigProvider>
      </DemoBlock>

      <DemoBlock title='端外环境 (onlyZhihuShow true 时不再展示顶部栏)' padding='0'>
        <ConfigProvider ua={{ Zhihu: false }}>
          <Child />
        </ConfigProvider>
      </DemoBlock>

    </>

  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | _ReactNode_ | `''` |
| leftText | 左侧文案 | _ReactNode_ | `''` |
| showLeftBack | 当未定义左侧箭头时，是否展示默认的返回箭头 | _boolean_ | `false` |
| rightText | 右侧文案 | _ReactNode_ | `''` |
| leftArrow | 自定义左侧箭头 | _ReactNode_ | `false` |
| border | 是否显示下边框 | _boolean_ | `false` |
| fixed | 是否固定在顶部 | _boolean_ | `true` |
| placeholder | 固定在顶部时，是否在标签位置生成一个等高的占位元素 | _boolean_ | `true` |
| safeAreaInsetTop | 是否开启「刘海屏顶部安全区适配」 | _boolean_ | `true` |
| onlyZhihuShow | 是否仅在知乎端内展示，需配合 **ConfigProvider** 组件传入 ua | _boolean_ | `false` |

### Events

| 事件名       | 说明               | 回调参数 |
| ------------ | ------------------ | -------- |
| onClickLeft  | 点击左侧按钮时触发 | -        |
| onClickRight | 点击右侧按钮时触发 | -        |