import { createForm, formSubscriptionItems } from 'final-form';
import { getChildren } from './utils';

const defaultSubscription = formSubscriptionItems.reduce((result, key) => {
  result[key] = true;

  return result;
}, {});

const createValidatorFromSchema = validationSchema => {
  return async values => {
    try {
      await validationSchema.validate(values, {
        abortEarly: false
      });
    } catch (error) {
      const errors = error.inner.reduce(
        (collectedErrors, { path, message }) => {
          return {
            ...collectedErrors,
            [path]: message
          };
        },
        {}
      );

      return errors;
    }
  };
};

export default {
  name: 'final-form',

  props: {
    initialValues: Object,
    submit: {
      type: Function,
      default: () => {}
    },
    subscription: Object,
    validationSchema: Object
  },

  provide() {
    return {
      finalForm: this.finalForm
    };
  },

  data() {
    return {
      finalForm: createForm({
        onSubmit: this.submit,
        initialValues: this.initialValues,
        validate: this.getValidator()
      }),
      formState: null
    };
  },

  methods: {
    getValidator() {
      return createValidatorFromSchema(this.validationSchema);
    },
    handleSubmit(e) {
      e && e.preventDefault();
      this.finalForm.submit();
    }
  },

  created() {
    this.unsubscribe = this.finalForm.subscribe(state => {
      this.formState = state;
      this.$emit('change', state);
    }, this.subscription || defaultSubscription);
  },

  beforeDestroy() {
    this.unsubscribe();
  },

  render(h) {
    return (
      <form class={['vf-form', this.class]} onSubmit={this.handleSubmit}>
        {getChildren(this.$slots.default)}
      </form>
    );
  }
};
