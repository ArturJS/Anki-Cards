import VueTypes from 'vue-types';
import { fieldSubscriptionItems } from 'final-form';
import { getChildren } from './utils';

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
      subscription
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
    renderRegisteredField(h) {
      const { blur, change, focus, value, name, ...meta } = this.fieldState;
      const component = fieldsMap[this.type];

      return h(component, {
        props: {
          events: this.fieldEvents,
          value,
          name,
          meta: {
            ...meta,
            error: meta.error || ''
          }
        }
      });
    }
  },

  render(h) {
    const isRegisteredField = !!fieldsMap[this.type];

    if (!isRegisteredField) {
      throw new Error(`Field with type="${this.type}" not found!`);
    }

    return this.renderRegisteredField(h);
  }
};
