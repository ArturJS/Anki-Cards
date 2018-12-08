<template>
  <section>
    <Form
      :submit="handleSubmit"
      :initialValues="initialValues"
      :validationSchema="validationSchema"
      class="test-form"
      @change="updateState"
    >
      <Field
        type="text"
        name="email"
      />
      <Field
        type="text"
        name="other"
      />
      <button type="submit">
        Submit
      </button>
    </Form>

    <pre v-if="formState">
        <code>form state:<br><br>{{ JSON.stringify(formState, null, 2) }}</code>
    </pre>
  </section>
</template>

<script>
import * as yup from 'yup';
import './controls'; // necessary to register all custom field
import { Form, Field } from './forms';

const sleep = delayMs =>
  new Promise(resolve => {
    setTimeout(resolve, delayMs);
  });

export default {
  components: {
    Form,
    Field
  },

  data() {
    return {
      formState: null,
      initialValues: {
        email: 'some@email.com'
      }
    };
  },

  computed: {
    validationSchema() {
      return yup.object().shape({
        email: yup
          .string()
          .email('Please enter email in correct format')
          .required('Please enter email'),
        other: yup.string().required('Please enter other')
      });
    }
  },

  methods: {
    async handleSubmit(state) {
      await sleep(2000);
      console.log(state);
    },

    updateState(state) {
      this.formState = state;
    }
  }
};
</script>
