# Empty 空状态

## 介绍

空状态时的展示占位图。当没有数据时，用于显式的用户提示。

## 引入

```js
import { Empty } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

垂直方向支持配置「图片」、「主标题」、「描述」、「按钮」配置，均为可选配置。

```tsx
import React from 'react'
import { Empty } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {

  return (
    <>
      <DemoBlock title='图片 + 主标题' padding='0'>
        <Empty
          title='空模块的主标题'
        />
      </DemoBlock>

      <DemoBlock title='图片 + 主标题 + 描述' padding='0'>
        <Empty
          title='空模块的主标题'
          content='这个模块是空内容的描述文案这个模块是空内容的描述文案这个模块是空内容的描述文案'
        />
      </DemoBlock>

      <DemoBlock title='图片 + 主标题 + 描述 + 按钮' padding='0'>
        <Empty
          title='空模块的主标题'
          content='这个模块是空内容的描述文案这个模块是空内容的描述文案这个模块是空内容的描述文案'
          buttonText='我是按钮'
          onButtonClick={() => alert('OK')}
        />
      </DemoBlock>

      <DemoBlock title='主标题 + 描述' padding='0'>
        <Empty
          image='none'
          title='空模块的主标题'
          content='这个模块是空内容的描述文案这个模块是空内容的描述文案这个模块是空内容的描述文案'
        />
      </DemoBlock>

      <DemoBlock title='图片 + 描述' padding='0'>
        <Empty
          content='这个模块是空内容的描述文案这个模块是空内容的描述文案这个模块是空内容的描述文案'
        />
      </DemoBlock>
    </>

  )
}
```

### 更多图片样式

支持以下多种样式

- default（通用空页面）
- loadingError（加载失败）
- noNetwork（无网络）
- contentError（内容异常）
- noWorks（无创作）
- noCollection（无收藏）
- noBalance（无金额）

```tsx
import React from 'react'
import { Empty } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {

  return (
    <>
      <DemoBlock title='通用空页面' padding='0'>
        <Empty
          title='通用空页面 (默认)'
        />
      </DemoBlock>

      <DemoBlock title='加载失败' padding='0'>
        <Empty
          title='加载失败'
          image='loadingError'
        />
      </DemoBlock>

      <DemoBlock title='无网络' padding='0'>
        <Empty
          title='无网络'
          image='noNetwork'
        />
      </DemoBlock>

      <DemoBlock title='内容异常' padding='0'>
        <Empty
          title='内容异常'
          image='contentError'
        />
      </DemoBlock>

      <DemoBlock title='无创作' padding='0'>
        <Empty
          title='无创作'
          image='noWorks'
        />
      </DemoBlock>

      <DemoBlock title='无收藏' padding='0'>
        <Empty
          title='无收藏'
          image='noCollection'
        />
      </DemoBlock>

      <DemoBlock title='无金额' padding='0'>
        <Empty
          title='无金额'
          image='noBalance'
        />
      </DemoBlock>

      <DemoBlock>
        <Empty
          title='chips 通用空页面 (默认)'
          theme='CHIPS'
        />
      </DemoBlock>

      <DemoBlock title='加载失败' padding='0'>
        <Empty
          title='chips 加载失败'
          image='loadingError'
        />
      </DemoBlock>

      <DemoBlock title='chips 无网络' padding='0'>
        <Empty
          title='无网络'
          image='noNetwork'
        />
      </DemoBlock>

      <DemoBlock title='chips 内容异常' padding='0'>
        <Empty
          title='内容异常'
          image='contentError'
        />
      </DemoBlock>
    </>

  )
}
```

### 夜间模式

夜间模式可配合 `config-provider` 传入对应主题色。

```tsx
import React, { useEffect } from 'react'
import { Empty, ConfigProvider } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {

  useEffect(() => {
    const root = document.documentElement
    const oriValue = root.getAttribute('data-prefers-color')
    root.setAttribute('data-prefers-color', 'dark')

    return () => {
      oriValue && root.setAttribute('data-prefers-color', oriValue)
    }
  }, [])

  return (
    <ConfigProvider theme='dark'>
      <DemoBlock title='图片 + 主标题' padding='0'>
        <Empty
          title='空模块的主标题'
        />
      </DemoBlock>

      <DemoBlock title='图片 + 主标题 + 描述' padding='0'>
        <Empty
          title='空模块的主标题'
          content='这个模块是空内容的描述文案这个模块是空内容的描述文案这个模块是空内容的描述文案'
        />
      </DemoBlock>

      <DemoBlock title='图片 + 主标题 + 描述 + 按钮' padding='0'>
        <Empty
          title='空模块的主标题'
          content='这个模块是空内容的描述文案这个模块是空内容的描述文案这个模块是空内容的描述文案'
          buttonText='我是按钮'
          onButtonClick={() => alert('OK')}
        />
      </DemoBlock>

      <DemoBlock title='主标题 + 描述' padding='0'>
        <Empty
          image='none'
          title='空模块的主标题'
          content='这个模块是空内容的描述文案这个模块是空内容的描述文案这个模块是空内容的描述文案'
        />
      </DemoBlock>

      <DemoBlock title='图片 + 描述' padding='0'>
        <Empty
          content='这个模块是空内容的描述文案这个模块是空内容的描述文案这个模块是空内容的描述文案'
        />
      </DemoBlock>

      <DemoBlock title='通用空页面' padding='0'>
        <Empty
          title='通用空页面 (默认)'
        />
      </DemoBlock>

      <DemoBlock title='加载失败' padding='0'>
        <Empty
          title='加载失败'
          image='loadingError'
        />
      </DemoBlock>

      <DemoBlock title='无网络' padding='0'>
        <Empty
          title='无网络'
          image='noNetwork'
        />
      </DemoBlock>

      <DemoBlock title='内容异常' padding='0'>
        <Empty
          title='内容异常'
          image='contentError'
        />
      </DemoBlock>

      <DemoBlock title='无创作' padding='0'>
        <Empty
          title='无创作'
          image='noWorks'
        />
      </DemoBlock>

      <DemoBlock title='无收藏' padding='0'>
        <Empty
          title='无收藏'
          image='noCollection'
        />
      </DemoBlock>

      <DemoBlock title='无金额' padding='0'>
        <Empty
          title='无金额'
          image='noBalance'
        />
      </DemoBlock>
    </ConfigProvider>

  )
}
```

### CHIPS 类型展示

支持的样式

- chipsLoadingError（加载失败）
- chipsNoNetwork（无网络）
- chipsContentError（内容异常）

```tsx
import React from 'react'
import { Empty, ConfigProvider } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {

  return (
    <>
      <ConfigProvider theme='dark'>
        <DemoBlock>
          <Empty
            title='chips 页面加载失败'
            theme='CHIPS'
            image='chipsLoadingError'
            buttonText='刷新试试'
          />
        </DemoBlock>

      </ConfigProvider>
      <DemoBlock>
        <Empty
          title='chips 无网络'
          theme='CHIPS'
          image='chipsNoNetwork'
          buttonText='刷新试试'
        />
      </DemoBlock>
      <DemoBlock>
        <Empty
          title='chips 内容加载失败'
          theme='CHIPS'
          image='chipsContentError'
          buttonText='刷新试试'
        />
      </DemoBlock>
    </>

  )
}
```

## API

### Empty Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片样式 | _string_ | `default`，可参考下图片样式 |
| title | 标题 (最长为一行) | _string_ | 空 |
| content | 双行描述 (最长两行) | _string_ | 空 |
| buttonText | 按钮文案，当文案不存在时不展示按钮 | _string_ | 空 |
| onButtonClick | 点击按钮回调函数 | _MouseEventHandler_ | 空 |

#### image 图片样式

图片 svg 资源将单独拆分为 `empty-images.chunk.js`

- default（通用空页面）
- loadingError（加载失败）
- noNetwork（无网络）
- contentError（内容异常）
- noWorks（无创作）
- noCollection（无收藏）
- noBalance（无金额）
- none（不展示图片）