# SideBar 侧边导航

## 介绍

垂直展示导航栏。

## 引入

```js
import { SideBar } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

通过 value 绑定当前选中项的索引。通过 disabled 属性禁用选项。

```tsx
import React, { useState } from 'react'
import { SideBar, Toast } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [active, setActive] = useState(0)
  return (
    <DemoBlock title='基础用法' padding='0'>
      <SideBar
        value={active}
        onChange={(v) => {
          setActive(v)
          Toast.info(`选项 ${Number(v) + 1}`)
        }}
      >
        <SideBar.Item title='选项1' />
        <SideBar.Item title='选项2' />
        <SideBar.Item title='选项3' disabled />
      </SideBar>
    </DemoBlock>
  )
}
```

### 自定义页面

通过title自定义选项样式。

```tsx
import React, { useState } from 'react'
import { SideBar } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import classNames from 'classnames'
import './styles.less'

export default () => {
  const [activeKey, setActiveKey] = useState(0)
  const tabs = [
    {
      key: 0,
      title: '选项一'
    },
    {
      key: 1,
      title: '选项二',
      badge: '5'
    },
    {
      key: 2,
      title: '选项三',
      disabled: true
    }

  ]

  return (
    <DemoBlock title='自定义页面' padding='0'>
      <div className='container'>
        <div className='side'>
          <SideBar value={activeKey} onChange={setActiveKey}>
            {tabs.map(item => (
              <SideBar.Item key={item.key} title={item.title} disabled={item.disabled} />
            ))}
          </SideBar>
        </div>
        <div className='main'>
          <div
            className={classNames(
              'content',
              activeKey === 0 && 'active'
            )}
          >
            页面 1
          </div>
          <div
            className={classNames(
              'content',
              activeKey === 1 && 'active'
            )}
          >
            页面 2
          </div>
          <div
            className={classNames(
              'content',
              activeKey === 2 && 'active'
            )}
          >
            页面 3
          </div>
        </div>
      </div>
    </DemoBlock>
  )
}
```

### 页面自动定位

通过id自动定位内容。

```tsx
import React, { useEffect, useRef, useState } from 'react'
import { SideBar } from '@kfe/mix-ui'
import { CONTENT_TEXT } from './constants'
import './styles.less'

const items = [
  { key: 0, title: '第一项', text: CONTENT_TEXT[0] },
  { key: 1, title: '第二项', text: CONTENT_TEXT[1] },
  { key: 2, title: '第三项', text: CONTENT_TEXT[2] },
  { key: 3, title: '第四项', text: CONTENT_TEXT[3] }
]

export default () => {
  const [activeKey, setActiveKey] = useState(0)

  const handleScroll = () => {
    let currentKey = items[0].key
    for (const item of items) {
      const element = document.getElementById(`anchor-${item.key}`)
      if (!element) continue
      const rect = element.getBoundingClientRect()
      if (rect.top <= 0) {
        currentKey = item.key
      } else {
        break
      }
    }
    setActiveKey(currentKey)
  }

  const mainElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mainElement = mainElementRef.current
    if (!mainElement) return
    mainElement.addEventListener('scroll', handleScroll)
    return () => {
      mainElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='container'>
      <div className='side'>
        <SideBar
          value={activeKey}
          onChange={key => {
            document.getElementById(`anchor-${key}`)?.scrollIntoView()
          }}
        >
          {items.map(item => (
            <SideBar.Item key={item.key} title={item.title} />
          ))}
        </SideBar>
      </div>
      <div className='main' ref={mainElementRef}>
        {items.map(item => (
          <div key={item.key}>
            <h2 id={`anchor-${item.key}`}>{item.title}</h2>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## API

### SideBar Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className     | 自定义类名       | _string_           | -      |
| style         | 自定义样式       | _CSSProperties_    | -      |
| sideClassName | 左侧容器类名     | _string_           | -      |
| sideStyle     | 左侧容器样式     | _CSSProperties_    | -      |
| value         | 当前导航项的索引 | _number_ | `0`    |

### SideBar Events

| 事件名  | 说明            | 回调参数       |
| ------- | ------------- | -------------- |
| onChange | 切换面板的回调 | (_index: number_) => void |

### SideBarItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | _string_ | - |
| title | 内容 | _string \| React.ReactNode_ | `''` |
| disabled | 是否禁用该项 | _boolean_ | `false` |
| contentClassName | 内容区域类名 | _string_ | - |
| contentStyle | 内容区域样式 | _CSSProperties_ | - |

### SideBarItem Events

| 事件名  | 说明       | 回调参数        |
| ------- | ---------- | --------------- |
| onClick | 点击时触发 | (_index: number_) => void |