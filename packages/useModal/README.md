# `@tgu/useModal`

> modal弹窗，让弹窗更简单

## Usage

```js
import useModal from '@tgu/useModal'
```
<code>const {RenderModal, show, hide} = useModal(Modal)</code>

```bash
 
RenderModal: render组件
show: 显示弹窗钩子
hide: 隐藏弹窗钩子


Modal：自定义组件内容（会自动注入closeModal方法）

```


## Example

```jsx

// index.tsx
import useModal from '@tgu/useModal'
import MyCustomModal from './MyCustomModal' // 自定义的弹窗
const { show, hide, RenderModal } = useModal(MyCustomModal)
// 触发弹窗显示或隐藏
function showOrHide () {
  show() // 显示弹窗
  hide() // 隐藏弹窗
}
<RenderModal onSure={onSure} /* {...slotProps 自定义传参} */ />

```

```jsx
// MyCustomModal.tsx
// 默认会注入一个closeModal方法，调用改方法直接关闭弹窗
const MyCustomModal: FC<IProps> = ({ closeModal, onSure, ...slotProps }) => {
  useDidMount(() => {
    // 透传的参数
    console.log(slotProps)
  })

  return (
    <div>
      <div onClick={closeModal}>关闭弹窗</div>
      <div onClick={onSure}>确认方法</div>
    </div>
  )
}
```

