import React, { FC, useState } from 'react'

interface IProps {
  [key: string]: any
}

type TProps = Partial<{
  closeModal: () => void // 弹窗关闭方法
}> & IProps

const useModal = (Modal: FC<TProps>) => {
  const [isVisible, setIsVisible] = useState(false)
  function show() {
    setIsVisible(true)
  }
  function hide() {
    setIsVisible(false)
  }
  const RenderModal: FC<IProps> = ({ children, ...slotProps }) => (
    <>
      {
        isVisible && (
          <Modal closeModal={hide} {...slotProps}>
            {children}
          </Modal>
        )
      }
    </>
  )
  return { RenderModal, show, hide }
}

export default useModal
