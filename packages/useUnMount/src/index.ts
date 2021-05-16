import { useEffect } from 'react'

const useUnMount = (fn: () => void) => {
  useEffect(() => {
    return () => {
      fn()
    }
  }, [fn])
}

export default useUnMount
