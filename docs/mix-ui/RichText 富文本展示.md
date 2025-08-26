# RichText 富文本展示

## 介绍

富文本展示组件，内置了 [dompurify](https://www.npmjs.com/package/dompurify) xss 处理和部分标签默认样式优化 (来源于 xen)。

因为要同时支持服务端和客户端渲染，dompurify 在服务端使用时，需要安装 jsdom，为了实现同构导入且客户端不引入 jsdom 无用依赖，故实际使用的包为 [isomorphic-dompurify](https://www.npmjs.com/package/isomorphic-dompurify)

不推荐业务很重的场景使用该富文本组件 (例如需要带各种交互功能、渲染高亮、主题等)。适用于轻量富文本展示，例如：活动规则、简单富文本直接渲染。

## 引入

```js
import { RichText } from '@kfe/mix-ui';
```

## 代码演示

### 基础用法

#### 基本富文本内容渲染

```tsx
/* eslint-disable no-useless-escape */
import React from 'react'
import { RichText } from '@kfe/mix-ui'

const content = `<p>这是一个富文本内容示例。</p>
<h2>标题示例</h2>
<ul>
  <li>列表项 1</li>
  <li>列表项 2</li>
  <li>列表项 3</li>
</ul>`

export default () => {
  return (
    <div className='demo-rich-text'>
      <RichText content={content} />
    </div>
  )
}
```

#### xss

```tsx
import React from 'react'
import { RichText } from '@kfe/mix-ui'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <div className='demo-rich-text'>
      <DemoBlock title='图片加载错误 xss 注入' padding='0'>
        <RichText content='<img src=x onerror=alert(1) />' />
      </DemoBlock>
    </div>
  )
}
```

```js | pure
DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // becomes <img src="x">
DOMPurify.sanitize('<svg><g/onload=alert(2)//<p>'); // becomes <svg><g></g></svg>
DOMPurify.sanitize('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'); // becomes <p>abc</p>
DOMPurify.sanitize('<math><mi//xlink:href="data:x,<script>alert(4)</script>">'); // becomes <math><mi></mi></math>
DOMPurify.sanitize('<TABLE><tr><td>HELLO</tr></TABL>'); // becomes <table><tbody><tr><td>HELLO</td></tr></tbody></table>
DOMPurify.sanitize('<UL><li><A HREF=//google.com>click</UL>'); // becomes <ul><li><a href="//google.com">click</a></li></ul>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 富文本内容 | string | `''` |
| options | 富文本 dompurify 选项 | DOMPurify.Config | `{}` |

### Events

| 事件名       | 说明               | 回调参数 |
| ------------ | ------------------ | -------- |
| onClick      | 富文本组件点击 | -        |