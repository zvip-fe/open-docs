# List 列表

## 介绍

瀑布流滚动加载，用于展示长列表，当列表即将滚动到底部时，会触发事件并加载更多列表项。

## 引入

```js
import { List } from '@kfe/mix-ui'
```

## 代码演示

### 基础用法

List 组件滚动到底部时，会触发 `onLoad` 事件，此时可以发起异步操作并更新数据，若数据已全部加载完毕，则直接将 `finished` 设置成 `true` 即可。

- **List 内部包含了防止并发的重复请求的逻辑，使用中不需要额外处理**

```tsx
import React, { useState } from 'react'
import { List } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

// 模拟异步请求
async function getData (throwError: boolean): Promise<number[]> {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (throwError) {
        reject(new Error('error'))
      }
      resolve(Array.from({ length: 10 }, (_, i) => i))
    }, 2000)
  })
}

export default () => {
  const [list, setList] = useState<number[]>([])
  const [finished, setFinished] = useState(false)
  const [count, setCount] = useState(0)

  const onLoad = async () => {

    setCount(v => v + 1)
    const data: number[] = await getData(count === 1)
    setList(v => [...v, ...data])
    if (list.length >= 30) {
      setFinished(true)
    }
  }

  const styles: any = {
    height: 50,
    lineHeight: '50px',
    textAlign: 'center',
    borderBottom: '1px solid #056DE8'
  }

  return (
    <DemoBlock title='List 列表' padding='12px'>
      <List
        finished={finished}
        loadingText='加载中'
        errorText='加载失败'
        finishedText='无更多数据'
        onLoad={onLoad}
      >
        {list.map((_, i) => (
          <div key={i} style={styles}>{i}</div>
        ))}
      </List>
    </DemoBlock>
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| onLoad | 滚动条与底部距离小于 `offset` 时触发 | _(isRetry: boolean) => (Promise \| void)_ | - |
| onError | onLoad 失败调用 | (error: Error) => void | - |
| finished | 是否已加载完成，加载完成后不再触发`load`事件 | _boolean_ | `false` |
| offset | 触发加载事件的滚动触底距离阈值 | _number_ | `300` |
| loadingText | 加载过程中的提示文案 | _React.ReactNode_ \| _() => React.ReactNode_ | - |
| finishedText | 加载完成后的提示文案 | _ReactNode_ | - |
| errorText | 加载失败后的提示文案 | _React.ReactNode \| ((retry: () => void) => React.ReactNode)_ | - |

### 方法

通过 `ref` 可以获取到 `List` 实例并调用实例方法

| 方法名 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| check | 检查当前的滚动位置，若已滚动至底部，则会触发 onLoad 事件 | - | - |

### List 的运行机制是什么？

`List` 会监听浏览器的滚动事件并计算列表的位置，当列表底部与可视区域的距离小于 `offset` 时，List 会触发一次 load 事件。

### onLoad 无限加载问题？

`onLoad` 通过 `Promise` 捕获错误， 业务方通过 `catch` 捕获到错误要抛出，不然 `List` 组件内部不能感知到 rejected 状态。

### 为什么会连续触发 load 事件？

如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，`List` 会继续触发 `onLoad` 事件，直到内容铺满屏幕或数据全部加载完成。因此你需要调整每次获取的数据条数，理想情况下每次请求获取的数据条数应能够填满一屏高度。

### 在 html、body 上设置 overflow 后一直触发加载？

如果在 html 和 body 标签上设置了`overflow-x: hidden`样式，会导致 List 一直触发加载。

```css
html,
body {
  overflow-x: hidden;
}
```

这个问题的原因是当元素设置了`overflow-x: hidden`样式时，该元素的`overflow-y`会被浏览器设置为`auto`，而不是默认值`visible`，导致 List 无法正确地判断滚动容器。解决方法是去除该样式，或者在 html 和 body 标签上添加`height: 100%`样式。

### 类型定义

组件导出以下类型定义：

```ts
import type { ListProps, ListInstance } from '@kfe/mix-ui';
```