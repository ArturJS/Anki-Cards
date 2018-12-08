<template>
  <div class="field--text">
    <input
      :name="name"
      :value="value"
      type="text"
      v-on="events"
    >
    <span
      v-if="shouldShowError"
      class="error"
    >
      {{ meta.error }}
    </span>
  </div>
</template>

<script>
import VueTypes from 'vue-types';

export default {
  props: {
    name: VueTypes.string.isRequired,
    value: VueTypes.string.isRequired,
    events: VueTypes.shape({
      input: VueTypes.func.isRequired,
      blur: VueTypes.func.isRequired,
      focus: VueTypes.func.isRequired
    }).isRequired,
    meta: VueTypes.shape({
      error: VueTypes.string.isRequired,
      touched: VueTypes.bool.isRequired,
      submitFailed: VueTypes.bool.isRequired
    }).loose.isRequired
  },

  computed: {
    shouldShowError() {
      const { error, touched, submitFailed } = this.meta;

      return error && (touched || submitFailed);
    }
  }
};
</script>
