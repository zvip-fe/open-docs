# Picker 选择器

## 介绍

提供多个选项集合供用户选择，支持单列选择和多列级联，通常与[弹出层](/components/popup)组件配合使用。

## 引入

```js
import { Picker } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

- Picker 组件通过 `columns` 属性配置选项数据，`columns` 是一个包含字符串或对象的数组。
- 顶部栏包含标题、确认按钮和取消按钮，点击确认按钮触发 `confirm` 事件，点击取消按钮触发 `cancel` 事件。
- 选项可以为对象结构，通过设置 `disabled` 来禁用该选项。

```tsx
import React from 'react'
import { Picker, Toast } from '@kfe/mix-ui'

const columns = [
  { text: '南京', value: 0 },
  { text: '苏州', value: 1 },
  { text: '常州', value: 2 },
  { text: '淮安', value: 3 },
  { text: '扬州', value: 4 },
  { text: '南通', value: 5 },
  { text: '宿迁', value: 6 },
  { text: '泰州', value: 7 },
  { text: '无锡', value: 8 }
]

export default () => {
  return (
    <Picker
      title='基础使用'
      columns={columns}
      onChange={(val: string, selectRow, index: number) => {
        console.log('选中项: ', selectRow)
        Toast.info(`选中值${val}，索引: ${index}`)
      }}
      onCancel={() => Toast.info('点击取消按钮')}
      onConfirm={() => Toast.info('点击确认按钮')}
    />
  )
}
```

### 多列选择

`columns` 属性可以通过对象数组的形式配置多列选择，对象中可以配置选项数据、初始选中项等

```tsx
import React from 'react'
import { Picker, Toast } from '@kfe/mix-ui'

export default () => {
  const [value, setValue] = React.useState(['周二', '晚上'])
  return (
    <Picker
      value={value}
      onChange={(val: string[], _, index) => {
        Toast(`当前值：${val}, 当前索引：${index}`)
        setValue(val)
      }}
      columns={[
        ['周一', '周二', '周三', '周四', '周五'],
        ['上午', '下午', '晚上']
      ]}
    />
  )
}
```

### 级联选择

使用 `columns` 的 `children` 字段可以实现选项级联的效果，`value` 字段可以指定选项返回值

```tsx
import React from 'react'
import { Picker } from '@kfe/mix-ui'
import { cascaderData } from './data'

export default () => {
  const [value, setValue] = React.useState(['2', '2-2', '2-2-2'])
  return <Picker value={value} onChange={setValue} columns={cascaderData} />
}
```

> 级联选择的数据嵌套深度需要保持一致，如果部分选项没有子选项，可以使用空字符串进行占位

### 动态设置选项

通过 Picker 上的实例方法可以更灵活地控制选择器，比如使用 `setColumnValues` 方法实现多列联动。

```tsx
import React from 'react'
import { Picker } from '@kfe/mix-ui'

const cities = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州']
}

async function sleep (time) {
  return await new Promise(resolve => setTimeout(resolve, time))
}

async function request (key: string) {
  await sleep(1000)
  return cities[key]
}

export default () => {
  const [loading, setLoading] = React.useState(false)
  const [value, setValue] = React.useState<string[]>()
  const [columns, setColumns] = React.useState([
    { text: '浙江', children: [] },
    { text: '福建', children: [] }
  ])

  return (
    <>
      <Picker
        loading={loading}
        value={value}
        columns={columns}
        onChange={async (values: string[]) => {
          const key = values[0]
          if (!key) return
          // 已请求的忽略request
          if (
            columns.some(
              column => column.text === key && column.children.length > 0
            )
          ) {
            setValue(values)
            return
          }
          setLoading(true)
          const data = await request(key)
          setLoading(false)
          setColumns(columns =>
            columns.map(column => {
              if (column.text === key) {
                return {
                  ...column,
                  children: data.map(x => ({ text: x, value: x }))
                }
              }
              return column
            })
          )
        }}
      />
    </>
  )
}
```

### 加载状态

若选择器数据是异步获取的，可以通过 `loading` 属性显示加载提示。

```tsx
import React from 'react'
import { Picker } from '@kfe/mix-ui'

export default () => {
  return (
    <Picker
      loading
      columns={[
        ['周一', '周二', '周三', '周四', '周五'],
        ['上午', '下午', '晚上']
      ]}
    />
  )
}
```

### 启用弹出层

可以通过 `popup` 属性启用弹出层特性

```tsx
import React, { useState } from 'react'
import { Picker } from '@kfe/mix-ui'

const columns = [
  '南京',
  '苏州',
  '常州',
  '淮安',
  '扬州',
  '南通',
  '宿迁',
  '泰州',
  '无锡'
]

export default () => {
  const [value, setValue] = useState('宿迁')
  return (
    <Picker
      popup={{
        round: true
      }}
      value={value}
      title='标题'
      columns={columns}
      onConfirm={setValue}
    >
      {(val: string, _, actions) => {
        return (
          <input
            readOnly
            value={val || ''}
            placeholder='请选择城市'
            onClick={() => actions.open()}
          />
        )
      }}
    </Picker>
  )
}
```

> 启用 `popup` 属性后，一般使用 `onConfirm` 事件代替 `onChange` 更新外部值

### 自定义 Columns 的结构

```tsx
import React from 'react'
import { Picker } from '@kfe/mix-ui'
import { fieldNamesData } from './data'

export default () => {
  const [value, setValue] = React.useState(['福建', '福州', '台江区'])
  return (
    <Picker
      title='标题'
      value={value}
      onChange={setValue}
      columns={fieldNamesData}
      columnsFieldNames={{
        text: 'cityName',
        children: 'cities'
      }}
    />
  )
}
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选中项 | _string\|string[]_ | - |
| defaultValue | 默认选中项 | _string\|string[]_ | - |
| columns | 对象数组，配置每一列显示的数据 | _PickerColumn\| PickerColumn[]_ | `[]` |
| columnsFieldNames | 自定义 `columns` 结构中的字段 | _object_ | `{ text: 'text', value: 'value', children: 'children' }` |
| title | 顶部栏标题 | _ReactNode_ | - |
| placeholder | 占位符内容 | _ReactNode\|ReactNode[]_ | `请选择` |
| confirmButtonText | 确认按钮文字 | _ReactNode_ | `确认` |
| cancelButtonText | 取消按钮文字 | _ReactNode_ | `取消` |
| toolbar | 自定义整个顶部栏的内容 | _ReactNode_ | - |
| toolbarPosition | 顶部栏位置，可选值为 `bottom` | _string_ | `top` |
| columnsTop | 自定义选项上方内容 | _ReactNode_ | - |
| columnsBottom | 自定义选项下方内容 | _ReactNode_ | - |
| optionRender | 自定义选项内容 | _(option: string \| object) => ReactNode_ | - |
| loading | 是否显示加载状态 | _boolean_ | `false` |
| showToolbar | 是否显示顶部栏 | _boolean_ | `true` |
| itemHeight | 选项高度，支持 `px` `vw` `vh` `rem` 单位，默认 `px` | _number \| string_ | `44` |
| visibleItemCount | 可见的选项个数 | _number \| string_ | `6` |
| swipeDuration | 快速滑动时惯性滚动的时长，单位 `ms` | _number \| string_ | `300` |

### Events

当选择器有多列时，事件回调参数会返回数组。

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| onConfirm | 点击完成按钮时触发 | 单列：选中值，选择项，选中项对应的索引<br>多列：所有列选中值，所有列选中项，所有列选中项对应的索引 |
| onChange | 选项改变时触发 | 单列：选中值，选择项，选中项对应的索引<br>多列：所有列选中值，所有列选中项，所有列选中项对应的索引 |
| onCancel | 点击取消按钮时触发 | - |

### PickerColumn 数据结构

```ts | pure
export type PickerColumnOption = {
  text?: React.ReactNode;
  value?: string;
  children?: PickerColumnOption[];
  disabled?: boolean;
} & Record<string, any>;

export type PickerColumn<T = PickerColumnOption> = (string | T)[];
```

### 方法

开启 `popup` 属性后, 通过 `ref` 可以获取到 `Picker` 实例并调用实例方法。

| 方法名 | 说明                         | 类型         |
| ------ | ---------------------------- | ------------ |
| open   | 显示 Picker                  | _() => void_ |
| close  | 关闭 Picker                  | _() => void_ |
| toggle | 切换 Picker 的显示和隐藏状态 | _() => void_ |

### 类型定义

通过 `PickerInstance` 获取 Picker 实例的类型定义。

```ts
import { useRef } from 'react';
import type { PickerInstance } from '@kfe/mix-ui';

const pickerRef = useRef<PickerInstance>();

pickerRef.current?.open();
```