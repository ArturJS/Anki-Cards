<template>
  <form 
    class="add-desk-form" 
    @submit.prevent="handleSubmit">
    <div class="form-field">
      <input 
        v-model="title" 
        class="form-input" 
        type="text" 
        placeholder="Enter desk name">
    </div>
    <button 
      type="submit" 
      class="btn btn-primary">
      Add desk
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: ''
    };
  },
  methods: {
    handleSubmit() {
      if (!this.title.trim()) {
        return;
      }

      this.$emit('submit', {
        id: Math.random(),
        title: this.title
      });

      this.title = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.add-desk-form {
  display: flex;
}

.form-field {
  flex-grow: 1;
}
</style>
