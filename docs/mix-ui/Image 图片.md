# Image 图片

## 介绍

基于 img 标签进行升级，提供多种图片填充模式，支持图片加载中提示、加载失败重试。

## 引入

```js
import { Image } from '@kfe/mix-ui';
```

## 代码演示

### 用法

```tsx
import React from 'react'
import { Image } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'
import './style.less'

const fits = ['contain', 'cover', 'fill', 'none', 'scale-down']

export default () => {
  return (
    <>
      <DemoBlock title='一、基础用法' padding='0'>
        <div className='demo-image'>
          <Image className='demo-class' src='https://picd.zhimg.com/50/v2-871cf0c7c844eb7c10500f983411f1a9.webp' />
        </div>
      </DemoBlock>

      <DemoBlock title='二、填充模式' padding='0'>
        {fits.map((el, index) => (
          <div key={index} style={{ marginBottom: '50px' }}>
            <Image fit={el} width={200} height={200} src='https://picd.zhimg.com/50/v2-871cf0c7c844eb7c10500f983411f1a9.webp' />
            <div className='demo-desc'>{el}</div>
          </div>
        ))}
      </DemoBlock>
      <DemoBlock title='三、加载中提示' padding='0'>
        <div className='demo-image'>
          <Image showLoading width={200} height={200} />
        </div>
      </DemoBlock>

      <DemoBlock title='四、加载错误提示' padding='0'>
        <div className='demo-image'>
          <Image width={200} height={200} src='https://picd.zhimg.com/50/v2-871cf0c7c844eb7c10500f983411f1a91.webp' />
        </div>
      </DemoBlock>

      <DemoBlock title='五、图片发生错误时的替换图片' padding='0'>
        <div className='demo-image'>
          <Image
            width={200}
            height={200}
            src='https://picd.zhimg.com/50/v2-871cf0c7c844e00f983411f1a91.webp'
            errImageSrc='https://picx.zhimg.com/v2-5f1b2e88e74e3b5ef14b374d51d95dd2.png?source=6a64a727'
          />
        </div>
      </DemoBlock>

      <DemoBlock title='六、图片懒加载' padding='0'>
        <div className='demo-image'>
          <Image fit='contain' width={200} height={200} src='https://picd.zhimg.com/50/v2-871cf0c7c844eb7c10500f983411f1a9.webp' lazyload />
        </div>
      </DemoBlock>

      <DemoBlock title='七、图片热区' padding='0'>
        <div className='demo-image'>

          <map name='infographic'>
            <area
              shape='poly'
              coords='129,0,260,95,129,138'
              href='https://developer.mozilla.org/docs/Web/HTTP'
              target='_blank'
              alt='HTTP'
            />
            <area
              shape='poly'
              coords='260,96,209,249,130,138'
              href='https://developer.mozilla.org/docs/Web/HTML'
              target='_blank'
              alt='HTML'
            />
            <area
              shape='poly'
              coords='209,249,49,249,130,139'
              href='https://developer.mozilla.org/docs/Web/JavaScript'
              target='_blank'
              alt='JavaScript'
            />
            <area
              shape='poly'
              coords='48,249,0,96,129,138'
              href='https://developer.mozilla.org/docs/Web/API'
              target='_blank'
              alt='Web APIs'
            />
            <area
              shape='poly'
              coords='0,95,128,0,128,137'
              href='https://developer.mozilla.org/docs/Web/CSS'
              target='_blank'
              alt='CSS'
            />
          </map>

          <Image className='demo-useMap-image' lazyload useMap='#infographic' src='https://picx.zhimg.com/v2-c37c23c3e85ff025f4b55270c791906f.png' />
        </div>
      </DemoBlock>

      <DemoBlock title='八、自定义热区 & 事件' padding='0'>
        <div className='demo-image'>

          <Image
            src='https://pic4.zhimg.com/v2-602088bf6224343320ec6040a36e85f4.png'
            areaList={[
              {
                coords: '35.8,95.6,614.4,387.4',
                onClick: () => {
                  alert(1)
                }
              },
              {
                coords: '32.4,399.4,616.1,687.8',
                onClick: () => {
                  alert(2)
                }
              }
            ]}
          />
        </div>
      </DemoBlock>

      <DemoBlock title='九、多张图片使用自定义热区 & 坐标使用百分比' padding='0'>
        <div className='demo-image'>

          <Image
            src='https://pic4.zhimg.com/v2-602088bf6224343320ec6040a36e85f4.png'
            areaList={[
              {
                coords: '10%,10%,20%,20%',
                onClick: () => {
                  alert(1)
                }
              },
              {
                coords: '23%,25%,60%,70%',
                onClick: () => {
                  alert(2)
                }
              }
            ]}
          />

          <Image
            src='https://pic1.zhimg.com/v2-14cac3bf24e08efa64c800f8ce8d66a1.png'
            style={{ width: '100%' }}
            areaList={[
              {
                coords: '25%,4%,73%,10%',
                onClick: e => {
                  alert('3')
                }
              },
              {
                coords: '27%,20%,83%,44%',
                onClick: e => {
                  alert('4')
                }
              }
            ]}
          />
        </div>
      </DemoBlock>
    </>
  )
}
```

## API

### Image Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | class 名称 | _string_ | `` |
| src | 图片地址链接 | _string_ | `` |
| width | 图片宽度 | _number \| string_ | `` |
| height | 图片高度 | _number \| string_| `` |
| fit | 填充模式 | _string_ | `cover` |
| theme | 日夜间模式 | _string_ | `` |
| nightImageSrc | 夜间模式下图片地址链接 | _string_ | `` |
| alt | 图片 alt 属性 | _string_ | `` |
| showLoading | 图片未加载完成时展示加载提示 | _boolean_ | `false` |
| showError | 图片加载失败时展示失败提示 | _boolean_ | `true` |
| errImageSrc | 图片发送错误时的替换图片 | _string_ | `` |
| lazyload | 是否开启懒加载 |  _boolean_  | `false` |
| [useMap](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/useMap) | 图片热区设置 | _string_ | `` |
| areaList | 热区设置，当设置了 「areaList」 时，useMap 参数将失效 | _{onClick, shape, coords}[]_ | `[]` |

### fit 值枚举

| 值 | 含义 |
| --- | --- |
| contain | 保持原有尺寸比例，内容被缩放 |
| cover | 保持原有尺寸比例，但部分内容可能被剪切 |
| fill | 不保证保持原有的比例，内容拉伸填充整个内容容器 |
| none | 保留原有元素内容的长度和宽度，也就是说内容不会被重置 |
| scale-down | 保持原有尺寸比例。内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些 |

### coords 传值

| 类型 | 举例 | 说明 |
| --- | --- | --- |
| 百分比 | '10%,10%,20%,20%' | 百分比根据图片大小设置坐标 |
| 数字 | '10,10,20,20' | 单位 px，依据实际传入的数字设置坐标 |