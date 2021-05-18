import React, { FC } from 'react'
import './index.scss'

const Toast: FC = ({ children }) => (
  <div className="tgu__component_toast">
    <div className="tgu__container">
      {children}
    </div>
  </div>
)

Toast.defaultProps = {}

export default Toast