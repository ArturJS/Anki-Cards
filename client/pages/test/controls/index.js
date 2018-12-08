import text from './text';
import { registerFields } from 'vue-formik';

registerFields([
  {
    name: 'text',
    component: text
  }
]);
