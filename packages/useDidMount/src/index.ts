import { useEffect } from 'react'

const useDidMount = (fn: () => void) => {
  useEffect(fn, [])
}

export default useDidMount
