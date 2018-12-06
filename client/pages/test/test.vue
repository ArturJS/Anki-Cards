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
          name="email"
        >
          <div slot-scope="props">
            <input
              :name="props.name"
              :value="props.value"
              type="email"
              v-on="props.events"
            >
            <span
              v-if="props.meta.touched && props.meta.error"
              class="error"
            >
              {{ props.meta.error }}
            </span>
          </div>
        </Field>
        <Field
          :validate="[range(6, 20), noSpecialChars]"
          name="password"
        >
          <div slot-scope="props">
            <input
              :name="props.name"
              :value="props.value"
              type="password"
              v-on="props.events"
            >
            <span
              v-if="props.meta.touched && props.meta.error"
              class="error"
            >
              {{ props.meta.error }}
            </span>
          </div>
        </Field>
        <Field
          :validate="matchedPassword"
          name="confirmPassword"
        >
          <div slot-scope="props">
            <input
              :name="props.name"
              :value="props.value"
              type="password"
              v-on="props.events"
            >
            <span
              v-if="props.meta.touched && props.meta.error"
              class="error"
            >
              {{ props.meta.error }}
            </span>
          </div>
        </Field>
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
    updateState(state) {
      this.formState = state;
    },
    required(v) {
      return v ? null : 'This field is required!';
    },
    matchedPassword(value, values) {
      return value === values.password ? null : 'Mismatched password!';
    },
    range(min, max) {
      return value => {
        return value && value.length >= min && value.length <= max
          ? null
          : `Password should be between length ${min} and ${max}`;
      };
    },
    noSpecialChars(v) {
      return /[!@#$%^&*()]/.test(v) ? 'Please do not use specfial chars' : null;
    }
  }
};
</script>
