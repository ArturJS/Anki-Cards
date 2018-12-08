import { createForm, formSubscriptionItems } from 'final-form';
import { getChildren, composeFormValidators } from './utils';

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
    validate: [Function, Array],
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
      if (this.validationSchema) {
        return createValidatorFromSchema(this.validationSchema);
      }

      return Array.isArray(this.validate)
        ? composeFormValidators(this.validate)
        : this.validate;
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
    const children = this.$scopedSlots.default
      ? this.$scopedSlots.default({
          ...this.formState,
          handleSubmit: this.handleSubmit,
          mutators: this.finalForm.mutators,
          batch: this.finalForm.batch,
          blur: this.finalForm.blur,
          change: this.finalForm.change,
          focus: this.finalForm.focus,
          initialize: this.finalForm.initialize,
          reset: this.finalForm.reset
        })
      : this.$slots.default;

    return h('div', null, getChildren(children));
  }
};
