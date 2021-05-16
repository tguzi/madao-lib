/* You can see me: https://github.com/tguzi */
import { useRef, useEffect } from 'react';

var useUpdateEffect = function (effect, deps) {
  var isMounted = useRef(false);
  useEffect(function () {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
//# sourceMappingURL=index.js.map
