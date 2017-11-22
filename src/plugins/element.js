/**
 * Inject Axios into Vue component
 */

import {
  Message
} from 'element-ui';

export default Vue => {
  // mount the axios to Vue
  Object.defineProperties(Vue, {
    Message: { get: () => Message }
  })


}
