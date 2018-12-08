<template>
  <section>
    <Form
      :submit="handleSubmit"
      :initialValues="initialValues"
      @change="updateState"
    >
      <form
        slot-scope="props"
        @submit="props.handleSubmit"
      >
        <Field
          :validate="required"
          name="text"
        />
        <button
          :disabled="props.submitting"
          type="submit"
        >
          {{ props.submitting ? 'Submitting' : 'Submit' }}
        </button>
      </form>
    </Form>

    <pre v-if="formState">
        <code>form state:<br><br>{{ JSON.stringify(formState, null, 2) }}</code>
    </pre>
  </section>
</template>

<script>
import { Form, Field } from './forms';
import './controls'; // necessary to register all custom fields

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

  methods: {
    async handleSubmit(state) {
      await sleep(2000);
      console.log(state);
    },
    required(v) {
      return v ? null : 'This field is required!';
    },
    updateState(state) {
      this.formState = state;
    }
  }
};
</script>
