import VueTypes from 'vue-types';
import { fieldSubscriptionItems } from 'final-form';
import { getChildren, composeFieldValidators } from './utils';

const fieldsMap = {};

const registerField = ({ name, component }) => {
  fieldsMap[name] = component;
};

export const registerFields = fields => {
  fields.forEach(field => {
    registerField(field);
  });
};

export default {
  name: 'final-field',

  inject: ['finalForm'],

  props: {
    type: VueTypes.custom(value => {
      return VueTypes.utils.validate(
        value,
        VueTypes.oneOf(Object.keys(fieldsMap))
      );
    }, 'Wrong field type!'),
    name: {
      required: true,
      type: String
    },
    validate: [Function, Array],
    subscription: Object
  },

  data() {
    return {
      fieldState: {}
    };
  },

  created() {
    const subscription =
      this.subscription ||
      fieldSubscriptionItems.reduce((result, key) => {
        result[key] = true;
        return result;
      }, {});

    this.unsubscribe = this.finalForm.registerField(
      this.name,
      fieldState => {
        this.fieldState = fieldState;
        this.$emit('change', fieldState);
      },
      subscription,
      {
        getValidator: Array.isArray(this.validate)
          ? composeFieldValidators(this.validate)
          : () => this.validate
      }
    );
  },

  beforeDestroy() {
    this.unsubscribe();
  },

  computed: {
    fieldEvents() {
      return {
        input: e => this.fieldState.change(e.target.value),
        blur: () => this.fieldState.blur(),
        focus: () => this.fieldState.focus()
      };
    }
  },

  methods: {
    renderRegisteredComponent(createElement) {
      const { value, name, ...meta } = this.fieldState;
      const component = fieldsMap[this.type];

      return createElement(component, {
        props: {
          events: this.fieldEvents,
          value,
          name,
          meta
        }
      });
    },

    renderChildren() {
      const { blur, change, focus, value, name, ...meta } = this.fieldState;
      const children = this.$scopedSlots.default({
        events: this.fieldEvents,
        value,
        name,
        meta
      });

      return getChildren(children)[0];
    }
  },

  render(createElement) {
    const isRegisteredComponent = !!fieldsMap[this.type];

    if (isRegisteredComponent) {
      return this.renderRegisteredComponent(createElement);
    } else {
      return this.renderChildren();
    }
  }
};
