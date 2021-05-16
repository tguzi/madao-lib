/* You can see me: https://github.com/tguzi */
import { useEffect } from 'react';

var useUnMount = function (fn) {
  useEffect(function () {
    return function () {
      fn();
    };
  }, [fn]);
};

export default useUnMount;
//# sourceMappingURL=index.js.map
