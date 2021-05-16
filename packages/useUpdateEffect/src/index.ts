import { useEffect, useRef } from 'react'

// 依赖更新时才执行 - 去初始化
const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      return effect()
    }
  }, deps)
}

export default useUpdateEffect
