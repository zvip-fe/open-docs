# Form 表单

## 介绍

用于数据录入、校验，支持输入框、单选框、复选框、文件上传等类型。

> Form 组件是基于[rc-field-form](https://github.com/react-component/field-form)的封装

## 引入

```js
import { Form } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

在表单中，每个 Form.Item 组件代表一个表单项，使用 Form.Item 的 `rules` 属性定义校验规则。

```tsx
import React from 'react'
import { Button, Input, Form } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [form] = Form.useForm()

  const onFinish = values => {
    console.log(values)
  }

  return (
    <DemoBlock title='基础用法' padding='12px 0'>
      <Form
        form={form}
        onFinish={onFinish}
        layout='vertical'
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button block>
              提交
            </Button>
          </div>
        }
      >
        <Form.Item
          tooltip={{
            message:
              '请确保这是唯一的用户名'
          }}
          intro='请确保这是唯一的用户名'
          rules={[{ required: true, message: '请填写用户名' }]}
          name='username'
          label='用户名'
        >
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: '请填写密码' }]}
          name='password'
          label='密码'
        >
          <Input placeholder='请输入密码' />
        </Form.Item>
      </Form>
    </DemoBlock>
  )
}
```

### 校验规则

通过 `rules` 定义表单校验规则，查看更多[rule 文档](https://github.com/react-component/field-form#rule)。

```tsx
import React from 'react'
import { Button, Input, Toast, Form } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const onFinish = values => {
    console.log(values)
  }

  return (
    <DemoBlock title='校验规则' padding='12px 0'>
      <Form
        onFinish={onFinish}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button block>
              提交
            </Button>
          </div>
        }
      >
        <Form.Item
          name='text1'
          label='正则校验'
          rules={[{ pattern: /\d{6}/, message: '请输入6位数字' }]}
        >
          <Input placeholder='正则校验' />
        </Form.Item>
        <Form.Item
          name='text2'
          label='函数校验'
          rules={[
            {
              validator: (_, value) => {
                if (/1\d{10}/.test(value)) {
                  return Promise.resolve(true)
                }
                return Promise.reject(new Error('请输入正确的手机号码'))
              }
            }
          ]}
        >
          <Input placeholder='函数校验' />
        </Form.Item>
        <Form.Item
          label='异步函数校验'
          name='text3'
          rules={[
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  Toast.info('验证中...')

                  setTimeout(() => {
                    if (/\d{6}/.test(value)) {
                      resolve(true)
                    } else {
                      reject(new Error('请输入正确内容'))
                    }
                    Toast.clear()
                  }, 1000)
                })
              }
            }
          ]}
        >
          <Input placeholder='异步函数校验' />
        </Form.Item>
      </Form>
    </DemoBlock>
  )
}
```

### 表单项类型

```tsx
import React from 'react'
import {
  Button,
  Checkbox,
  Input,
  Radio,
  Form,
  Picker
} from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  const [form] = Form.useForm()

  const onFinish = values => {
    console.log(values)
  }

  return (
    <DemoBlock title='表单项类型' padding='12px 0'>
      <Form
        colon
        form={form}
        onFinish={onFinish}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button block>
              提交
            </Button>
          </div>
      }
      >
        <Form.Item name='checkbox' label='复选框' valuePropName='checked'>
          <Checkbox />
        </Form.Item>
        <Form.Item
          name='checkbox_group'
          label='复选框组'
          initialValue={['c1', 'c2']}
        >
          <Checkbox.Group direction='horizontal'>
            <Checkbox name='c1'>
              复选框1
            </Checkbox>
            <Checkbox name='c2'>
              复选框2
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name='radio' label='单选框'>
          <Radio.Group direction='horizontal'>
            <Radio name='r1'>单选框1</Radio>
            <Radio name='r2'>单选框2</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          isLink
          name='picker'
          label='城市选择'
          trigger='onConfirm'
          onClick={(_, action) => {
            action.current?.open()
          }}
        >
          <Picker
            popup
            columns={[
              '南京',
              '苏州',
              '常州',
              '淮安',
              '扬州',
              '南通',
              '宿迁',
              '泰州',
              '无锡'
            ]}
          >
            {val => val || '请选择城市'}
          </Picker>
        </Form.Item>
        <Form.Item name='textarea' label='详细地址'>
          <Input.TextArea rows={3} autoSize maxLength={140} showWordLimit />
        </Form.Item>
      </Form>
    </DemoBlock>
  )
}
```

### 自定义表单项

自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

- 提供受控属性 `value` 值同名的属性。
- 提供 `onChange` 事件。

```tsx
import React from 'react'
import { Button, Input, Form, Space, Picker, ArrowDown24 as ArrowDown } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

const columns = [
  { text: '86 🇨🇳', value: '86' },
  { text: '87 🇺🇸', value: '87' },
  { text: '88 🏳️‍🌈', value: '88' },
  { text: '89 🏳️‍⚧️', value: '89' },
  { text: '90 🇴🇲', value: '90' },
  { text: '91 🇵🇪', value: '91' },
  { text: '92 🇩🇪', value: '92' }
]

interface MobileInputValue {
  prefix: string
  value: string
}

interface MobileInputProps {
  value?: MobileInputValue
  onChange?: (value: MobileInputValue) => void
}

// 自定义表单项
const MobileInput: React.FC<MobileInputProps> = ({
  value = { prefix: '', value: '' },
  onChange
}) => {
  const trigger = (changedValue: Partial<MobileInputValue>) => {
    onChange?.({ ...value, ...changedValue })
  }

  const onMobileChange = (value: string) => {
    trigger({ value })
  }

  const onPrefixChange = (prefix: string) => {
    trigger({ prefix })
  }

  return (
    <Picker
      popup
      value={value.prefix}
      placeholder={false}
      columns={columns}
      onConfirm={onPrefixChange}
    >
      {(_, selectRow: any, actions) => {
        return (
          <Space>
            <Space align='center' onClick={() => actions.open()}>
              <div>+{selectRow?.text}</div>
              <ArrowDown style={{ display: 'block' }} />
            </Space>
            <Input
              value={value.value}
              placeholder='请输入手机号'
              onChange={onMobileChange}
            />
          </Space>
        )
      }}
    </Picker>
  )
}

export default () => {
  const [form] = Form.useForm()

  const checkMobileInput = (_, value: MobileInputValue) => {
    if (value.prefix && value.value) {
      return Promise.resolve()
    }
    if (!value.prefix) Promise.reject(new Error('请选择国家区号!'))
    return Promise.reject(new Error('手机号不能为空!'))
  }

  const onFinish = values => {
    console.log(values)
  }

  return (
    <DemoBlock title='自定义表单项' padding='12px 0'>
      <Form
        layout='vertical'
        form={form}
        onFinish={onFinish}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button block>
              提交
            </Button>
          </div>
        }
      >
        <Form.Item name='name' label='姓名'>
          <Input placeholder='请输入用户姓名' />
        </Form.Item>
        <Form.Item
          initialValue={{ prefix: '86', value: '' }}
          name='mobile'
          label='手机号'
          rules={[{ required: true }, { validator: checkMobileInput }]}
        >
          <MobileInput />
        </Form.Item>
      </Form>
    </DemoBlock>
  )
}
```

### 更新订阅

在某些场景，例如修改某个字段值后出现新的字段选项、或希望表单任意变化都对某一个区域进行渲染，可以通过 `Form.Subscribe` 或者 `Form.useWatch` hook 实现。

#### Form.Subscribe 实现更新订阅

```tsx
import React from 'react'
import { Form, Input, Button, Radio, Space } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default function () {
  const [form] = Form.useForm()

  console.log('rerender')

  const onFinish = values => {
    console.log(values)
  }

  return (
    <DemoBlock title='Subscribe 更新订阅' padding='12px 0'>
      <Form
        form={form}
        initialValues={{
          type: 'mobile',
          account: '18888888888'
        }}
        onFinish={onFinish}
        footer={
          <>
            <Form.Subscribe to={['type', 'account']}>
              {({ type, account }) => (
                <div className='notice-footer'>
                  你将使用 {type === 'mobile' ? '手机号' : '邮箱'} {account} 登录
                </div>
              )}
            </Form.Subscribe>
            <div style={{ margin: '16px 16px 0' }}>
              <Button block>
                提交
              </Button>
            </div>
          </>
      }
      >
        <Form.Item name='type' label='登录方式'>
          <Radio.Group>
            <Space>
              <Radio name='mobile'>手机号</Radio>
              <Radio name='email'>邮箱</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Subscribe to={['type']}>
          {({ type }) => {
            return (
              <>
                {type === 'mobile' && (
                  <Form.Item name='account' label='手机号'>
                    <Input placeholder='请输入手机号' />
                  </Form.Item>
                )}
                {type === 'email' && (
                  <Form.Item name='account' label='邮箱'>
                    <Input placeholder='请输入邮箱' />
                  </Form.Item>
                )}
              </>
            )
          }}
        </Form.Subscribe>
      </Form>
    </DemoBlock>
  )
}
```

#### Form.useWatch 实现更新订阅

```tsx
import React from 'react'
import { Form, Input, Button, Radio, Space } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

interface FieldType { account?: string, loginMethod?: 'mobile' | 'email' }

export default function () {
  const [form] = Form.useForm<FieldType>()

  const account = Form.useWatch('account', form)
  const type = Form.useWatch('type', form)

  console.log('watch rerender')
  return (
    <DemoBlock title='useWatch 订阅更新' padding='12px 0'>
      <Form
        form={form}
        initialValues={{
          type: 'mobile',
          account: '18888888888'
        }}
        footer={
          <>
            <div className='notice-footer'>
              你将使用 {type === 'mobile' ? '手机号' : '邮箱'} {account} 登录
            </div>
            <div style={{ margin: '16px 16px 0' }}>
              <Button block>
                提交
              </Button>
            </div>
          </>
      }
      >
        <Form.Item name='type' label='登录方式'>
          <Radio.Group>
            <Space>
              <Radio name='mobile'>手机号</Radio>
              <Radio name='email'>邮箱</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        {type === 'mobile' && (
          <Form.Item name='account' label='手机号'>
            <Input placeholder='请输入手机号' />
          </Form.Item>
        )}
        {type === 'email' && (
          <Form.Item name='account' label='邮箱'>
            <Input placeholder='请输入邮箱' />
          </Form.Item>
        )}
      </Form>
    </DemoBlock>
  )
}
```

### 复杂联动

大部分场景下，你只需要编写代码或者与 `dependencies` 属性配合校验即可。而在某些特定场景，例如修改某个字段值后出现新的字段选项、或者纯粹希望表单任意变化都对某一个区域进行渲染。你可以通过 `shouldUpdate` 修改 `Form.Item` 的更新逻辑

```tsx
import React, { Fragment } from 'react'
import { Button, Input, Form, Checkbox, Space, Picker, Typography } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

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
  const [form] = Form.useForm()

  const onFinish = values => {
    console.log(values)
  }

  return (
    <DemoBlock title='复杂联动' padding='12px 0'>
      <Form
        colon
        form={form}
        onFinish={onFinish}
        footer={
          <div style={{ margin: '16px 16px 0' }}>
            <Button block>
              提交
            </Button>
          </div>
        }
        initialValues={{ type: ['mobile'] }}
      >
        <Form.Item name='type' label='联系方式'>
          <Checkbox.Group>
            <Space>
              <Checkbox name='mobile'>手机号</Checkbox>
              <Checkbox name='address'>地址</Checkbox>
            </Space>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name='name' label='姓名'>
          <Input placeholder='请输入姓名' />
        </Form.Item>
        <Form.Item noStyle shouldUpdate={(p, n) => p.type !== n.type}>
          {({ getFieldValue }) => {
            const type = getFieldValue('type') || []
            const content: unknown[] = []
            if (type.includes('mobile')) {
              content.push(
                <Form.Item key='mobile' name='mobile' label='手机号'>
                  <Input placeholder='请输入手机号' />
                </Form.Item>
              )
            }
            if (type.includes('address')) {
              content.push(
                <Fragment key='address'>
                  <Form.Item
                    isLink
                    name='area'
                    label='区域'
                    trigger='onConfirm'
                    onClick={(_, actions) => actions.current?.open()}
                  >
                    <Picker popup columns={columns}>
                      {val =>
                        val
                          ? (
                            <Typography.Text>{val}</Typography.Text>
                            )
                          : (
                              '请选择地址'
                            )}
                    </Picker>
                  </Form.Item>
                  <Form.Item name='area_address' label='详细地址'>
                    <Input.TextArea placeholder='请输入详细地址' />
                  </Form.Item>
                </Fragment>
              )
            }
            return content
          }}
        </Form.Item>
      </Form>
    </DemoBlock>
  )
}
```

### 动态增减表单项

Form.List 为字段提供数组化管理。

```tsx
import React from 'react'
import { Space, Button, Cell, Input, Form, Trash16, PlusCircle24 } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

export default () => {
  const onFinish = values => {
    console.log(values)
  }

  return (
    <DemoBlock title='动态增减表单项' padding='12px 0'>
      <div className='demo-form'>
        <Form
          onFinish={onFinish}
          footer={
            <div style={{ margin: '16px 16px 0' }}>
              <Button block>
                提交
              </Button>
            </div>
          }
        >
          <Cell.Group>
            <Form.List
              name='users'
              initialValue={[{ name: 'mix-ui', age: '1' }]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, idx) => (
                    <div className='form-list-item' key={field.key}>
                      <h6>
                        <Space block align='center' justify='between'>
                          <strong>用户{(idx as number) + 1}:</strong>
                          <Trash16
                            color='grey'
                            fontSize={18}
                            onClick={() => remove(idx)}
                          />
                        </Space>
                      </h6>
                      <div className='form-list-item__control'>
                        <Form.Item
                          label='姓名'
                          name={[field.name, 'name']}
                          rules={[
                            {
                              type: 'string',
                              min: 2,
                              max: 6,
                              message: '姓名最少两个字，最多6个字'
                            }
                          ]}
                        >
                          <Input placeholder='请输入用户姓名' />
                        </Form.Item>
                        <Form.Item
                          label='年龄'
                          name={[field.name, 'age']}
                          rules={[
                            {
                              type: 'number',
                              message: '请输入数字',
                              transform: v => Number(v)
                            }
                          ]}
                        >
                          <Input placeholder='请输入用户年龄' />
                        </Form.Item>
                      </div>
                    </div>
                  ))}
                  <div style={{ padding: '16px 16px 4px' }}>
                    <Button
                      block
                      icon={<PlusCircle24 />}
                      onClick={() => add()}
                      stroke
                    >
                      新增用户
                    </Button>
                  </div>
                </>
              )}
            </Form.List>
          </Cell.Group>
        </Form>
      </div>
    </DemoBlock>
  )
}
```

## Form Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 表单布局 | _horizontal \| vertical_ | `horizontal` |
| border | 统一设置表单项底部边框显示 | _boolean_ | `true` |
| colon | 配置 Form.Item 的 `colon` 的默认值。表示是否显示 label 后面的冒号 | _boolean_ | `false` |
| required | 配置 Form.Item 的 `required` 的默认值 | _boolean_ | - |
| showValidateMessage | 是否显示验证错误信息 | _boolean_ | `true` |
| labelAlign | 统一设置左侧文本对齐方式，可选值为 `center` `right` | _string_ | `left` |
| controlAlign | 统一设置右侧内容对齐方式，可选值为 `center` `right` | _string_ | `left` |
| footer | 表单底部内容 | _ReactNode_ | - |

> 更多 Form API 参见：[rc-field-form](https://github.com/react-component/field-form#form)

## Form.Item Props

Form.Item 的布局是基于 `Field` 实现的，所以它支持 [Field](./field#props) 的部分属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | 
| dependencies | 设置依赖字段，说明见下 | `string \| number \| (string \| number)[]` | - |
| disabled | 是否禁用 | `boolean` | 父级 Form 的 `disabled` |
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准 | `any` | - |
| messageVariables | 默认验证字段的信息 | `Record<string, string>` | - |
| noStyle | 不使用样式，只使用字段管理 | `boolean` | `false` |
| onClick | 点击事件 | `() => void` | - |
| required | 是否必选 | `boolean` | `false`（如有设置 `rules`，则会根据 `rules` 判断） |
| rules | 校验规则，设置字段的校验逻辑 | `Rule[]` | - |
| shouldUpdate | 自定义字段更新逻辑，说明见下 | `boolean \| (prevValue, curValue) => boolean` | `false` |
| trigger | 设置收集字段值变更的时机 | `string` | `onChange` |
| validateTrigger | 设置字段校验的时机 | `string \| string[]` | `onChange` |
| valuePropName | 子节点的值的属性，如 Switch 的是 'checked'。该属性为 `getValueProps` 的封装，自定义 `getValueProps` 后会失效 | `string` | `value` |
| layout | 单独设置表单项布局 | _horizontal \| vertical_ | - |
| border | 单独设置表单项底部边框是否显示 | _boolean_ | - |
| colon | 配合 label 属性使用，表示是否显示 label 后面的冒号 | _boolean_ | `false` |
| showValidateMessage | 是否显示验证信息 | _boolean_ | `true` |
| intro | 额外的提示信息 | _ReactNode_ | - |
| introClass | 额外的提示信息的类名 | _any_ | - |
| tooltip | 字段提示信息 | _ReactNode \|_ [DialogProps & { icon: ReactNode }](/components/dialog#props) | - |
| labelClass | 左侧文本额外类名 | _any_ | - |
| labelWidth | 左侧文本宽度，默认单位为`px` | _number \| string_ | `6.2em` |
| labelAlign | 左侧文本对齐方式，可选值为 `center` `right` | _string_ | `left` |
| controlAlign | 右侧输入控件容器的对齐方式，可选值为 `center` `right` | _string_ | `left` |
| leftIcon | 左侧图标 | _ReactNode_ | - |
| rightIcon | 右侧图标 | _ReactNode_ | - |
| prefix | 自定义控件前部内容 | _ReactNode_ | - |
| suffix | 自定义控件尾部内容 | _ReactNode_ | - |
| isLink | 是否展示右侧箭头并开启点击反馈 | _boolean_ | `false` |
| arrowDirection | 箭头方向，可选值为 `left` `up` `down` | _string_ | `right` |

> 更多 Form.Item API 参见：[rc-field-form](https://github.com/react-component/field-form#field)

## Form.Subscribe

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 渲染函数 | `(changedValues: Record<string, any>, form: FormInstance) => ReactNode` | - |
| to | 同 Form.Item 的 `dependencies` | `NamePath[]` | - |

## Form.List Props

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| children | 渲染函数 | _(fields: Field[], [operation](#operation), meta: { errors }) => React.ReactNode_ |
| initialValue | 设置子元素默认值，如果与 Form 的 initialValues 冲突则以 Form 为准 | _any[]_ |
| name | 字段名，支持数组 | _string \| number \| (string \| number)[]_ |

### operation

| 参数   | 说明       | 类型                                                 |
| ------ | ---------- | ---------------------------------------------------- |
| add    | 新增表单项 | _(defaultValue?: any, insertIndex?: number) => void_ |
| move   | 移动表单项 | _(from: number, to: number) => void_                 |
| remove | 删除表单项 | _(index: number \| number[]) => void_                |

## Rule 数据结构

使用 Field 的`rules`属性可以定义校验规则，可选属性如下:

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| type | 类型，常见有 `string` `number` `boolean` `url` `email`。更多请参考[此处](https://github.com/yiminghe/async-validator#type) | _string_ |
| enum | 是否匹配枚举中的值（需要将 `type` 设置为 `enum`） | _any[]_ |
| len | string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度 | _number_ |
| max | 必须设置 type：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度 | _number_ |
| min | 必须设置 type：string 类型为字符串最小长度；number 类型时为最小值；array 类型时为数组最小长度 | _number_ |
| transform | 将字段值转换成目标值后进行校验 | _(value) => any_ |
| whitespace | 如果字段仅包含空格则校验不通过，只在 type: 'string' 时生效 | _boolean_ |
| required | 是否为必选字段 | _boolean_ |
| message | 错误提示文案 | _string_ |
| validator | 自定义校验，接收 Promise 作为返回值 | _(rule, value, callback: (error?: string) => void, form) => Promise \| void_ |
| pattern | 正则表达式匹配 | _RegExp_ |
| validateTrigger | 设置触发验证时机，必须是 Form.Item 的 validateTrigger 的子集 | _string\| string[]_ |

## FAQ

- 摘自 [antd-mobile](https://mobile.ant.design/zh/components/form#formitem-%E5%A6%82%E4%BD%95%E9%85%8D%E5%90%88-picker--datepicker--cascadepicker-%E4%BD%BF%E7%94%A8)

被设置了 `name` 属性的 `Form.Item` 包装的控件，表单控件会**自动添加** `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，因此，如果你给 `Form.Item` 设置了 `name` 属性，**那么请确保它的 `children` 是一个有效的 `ReactElement` 控件** ，并且能够接受上文中提到的 `value` 和 `onChange` 属性（或指定的其他属性），例如：

```jsx | pure
<Form.Item name="foo">
  <Input />
</Form.Item>
```

而下面这些写法都是错误的：

```jsx | pure
<Form.Item name="foo">
  <Input />
  <div>hello</div>
</Form.Item>
// 错误：Form.Item 的 children 中包含了多个元素
```

```jsx | pure
<Form.Item name="foo">
  hello
  <Input />
</Form.Item>
// 错误：同上，Form.Item 的 children 中包含了多个元素
```

```jsx | pure
<Form.Item name="foo">
  <div>
    <Input />
  </div>
</Form.Item>
// 错误：Form.Item 的 children 其实是 div，而 div 并不能接受 value 和 onChange 属性
```

同时请注意：

1. 你**不再需要也不应该**用 `onChange` 来做数据收集同步（你可以使用 Form 的 `onValuesChange`），但还是可以继续监听 `onChange` 事件。
2. 你不能用控件的 `value` 或 `defaultValue` 等属性来设置表单域的值，默认值可以用 Form 里的 `initialValues` 来设置。注意 `initialValues` 不能被 `setState` 动态更新，你需要用 `setFieldsValue` 来更新。
3. 你不应该用 `setState`，可以使用 `form.setFieldsValue` 来动态改变表单值。

举个例子，下面的这种写法是错误的：

```jsx | pure
<Form.Item name="foo">
  <Input
    value={myInputValue} // 错误：value 不应该被手动控制
    onChange={(v) => {
      setMyInputValue(v);
    }} // 错误：虽然你可以监听 onChange 事件，但是你不应该在这里去维护自己的状态
  />
</Form.Item>
```

### dependencies

当字段间存在依赖关系时使用。如果一个字段设置了 `dependencies` 属性。那么它所依赖的字段更新时，该字段将自动触发更新与校验。一种常见的场景，就是注册用户表单的“密码”与“确认密码”字段。“确认密码”校验依赖于“密码”字段，设置 `dependencies` 后，“密码”字段更新会重新触发“校验密码”的校验逻辑。

`dependencies` 不应和 `shouldUpdate` 一起使用，因为这可能带来更新逻辑的混乱。

### shouldUpdate

Form 通过增量更新方式，只更新被修改的字段相关组件以达到性能优化目的。大部分场景下，你只需要编写代码或者与 [`dependencies`](#dependencies) 属性配合校验即可。而在某些特定场景，例如修改某个字段值后出现新的字段选项、或者纯粹希望表单任意变化都对某一个区域进行渲染。你可以通过 `shouldUpdate` 修改 Form.Item 的更新逻辑。

当 `shouldUpdate` 为 `true` 时，Form 的任意变化都会使该 Form.Item 重新渲染。这对于自定义渲染一些区域十分有帮助：

```jsx | pure
<Form.Item shouldUpdate>
  {() => {
    return <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>;
  }}
</Form.Item>
```

当 `shouldUpdate` 为方法时，表单的每次数值更新都会调用该方法，提供原先的值与当前的值以供你比较是否需要更新。这对于是否根据值来渲染额外字段十分有帮助：

```jsx | pure
<Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
  {() => {
    return (
      <Form.Item name="other">
        <Input />
      </Form.Item>
    );
  }}
</Form.Item>
```

### messageVariables

你可以通过 `messageVariables` 修改 Form.Item 的默认验证信息。

```jsx | pure
<Form>
  <Form.Item messageVariables={{ another: 'good' }} label="user">
    <Input />
  </Form.Item>
  <Form.Item messageVariables={{ label: 'good' }} label={<span>user</span>}>
    <Input />
  </Form.Item>
</Form>
```

### Form.Item 如何配合各个 Picker 使用？

首先，我们可以通过 Picker 的 `children` 渲染函数，来渲染当前已经选择的值，这里我们已 Picker 为例，但是对于其他的 Picker，也是大同小异的：

```jsx | pure
<Picker
  columns={[...]}
>
  {value =>
    value || 'Please select'
  }
</Picker>
```

接下来我们需要处理 Picker 的显示/隐藏状态，这是 Picker 组件和其他表单组件差异最大、也最容易让人迷惑的地方了。如果我们直接把 Picker 放在 Form.Item 里面，是没有办法展示给用户的，无论怎么点击，都不会让 Picker 弹出来：

```tsx | pure
<Form.Item
  name='birthday'
  label='Birthday'
>
  <Picker
    columns={[...]}
  >
    {value =>
      value || 'Please select'
    }
  </Picker>
</Form.Item>
```

在绝大多数情况下，我们需要实现的效果是，点击外层的 Form.Item，会触发内部 Picker 的显示。但是，在 Form.Item 上，怎么才能控制到 Picker 呢？或许你会想自己声明一个 state 来手动控制，例如：

```tsx | pure
const [visible, setVisible] = useState(false)
```

```tsx | pure
<Form.Item
  name='picker'
  label='Picker'
  onClick={() => {
    setVisible(true)
  }}
>
  <Picker
    columns={[...]}
    visible={visible}
    onClose={() => {
      setVisible(false)
    }}
  >
    {value =>
      value || 'Please select'
    }
  </Picker>
</Form.Item>
```

但是这样写实在是太繁琐了，而且如果一个表单内存在多个 Picker 或者要配合 Form.Array 使用时，简直会令人崩溃。

所以 antd-mobile 提供了一个便捷方法，你可以在 Form.Item 的 `onClick` 事件中，直接获取到内部 `children` 的 ref，因此我们可以这么写：

```tsx | pure
<Form.Item
  name='picker'
  label='Picker'
  onClick={(e, datePickerRef: RefObject<PickerPopupActions>) => {
    datePickerRef.current?.open() // ⬅️看这里
  }}
>
  <Picker
    columns={[...]}
    visible={visible}
    onClose={() => {
      setVisible(false)
    }}
  >
    {value =>
      value || 'Please select'
    }
  </Picker>
</Form.Item>
```

最后，别忘了 Picker 组件的确认事件是 `onConfirm` 而不是 `onChange`，因此你需要配置一下 `trigger`：

```tsx | pure
<Form.Item
  name='picker'
  label='Picker'
  trigger='onConfirm'  // ⬅️
  onClick={(e, datePickerRef: RefObject<PickerPopupActions>) => {
    datePickerRef.current?.open()
  }}
>
  ...
</Form.Item>
```