# `@tgu/Toast`

> 消息提示

单例模式调用，为了页面有更好的体验，建议页面中至多只有一个弹窗显示，所以采用单例模式，保证弹窗数量不超过1

## Usage

```jsx
import Toast, { notify, closeNotify } from '@tgu/toast'
```

1. 组件式用法
```jsx
 <Toast>aaa<Toast>
```

2. 命令式调用

```jsx
  // 打开弹窗
  notify(content [,duration = 1000])
  // 关闭弹窗 - 任意地方调用，会找到已有的弹窗，进行关闭
  closeNotify()
```
duration 默认1000（ms）
如果 duration = 0 的时候，notify不会自动销毁
