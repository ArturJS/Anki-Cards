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

.form-input {
  box-shadow: none;
  outline: 0;
  display: block;
  width: 100%;
  padding: 6px 12px;
  font-size: 16px;
  color: #333;
  background-color: #fcfcfb;
  background-image: none;
  border: 1px solid #c7c7c7;
  border-radius: 3px;
  font-family: sans-serif;
  -webkit-appearance: none;
  height: 40px;
  transition: border-color 0.25s ease;
  will-change: border-color;

  &:focus {
    border-color: #333;
    outline: 0;
  }
}
</style>
