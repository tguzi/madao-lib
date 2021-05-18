import React from 'react'
import ReactDOM from 'react-dom'
import Toast from './toast'

let el: any = null

// 创建消息提醒
const createNotification = (content: string) => {
  el = document.createElement('div')
  document.body.appendChild(el)
  ReactDOM.render(<Toast>{ content }</Toast>, el)
}

// 销毁消息提醒
export const destroyNotification = () => {
  if (!el) {
    return null
  }
  document.body.removeChild(el)
  ReactDOM.unmountComponentAtNode(el)
  el = null
}


// 消息提示
const notice = (content: string | null, duration = 1000): any => {
  // 保证只显示一个提示
  if (el) {
    return null
  }
  if (!content) {
    destroyNotification()
    return
  }
  createNotification(content)
  // 设置持续时间后，自动关闭提示
  if (duration) {
    setTimeout(() => {
      destroyNotification()
    }, duration)
  }
}

export default notice
