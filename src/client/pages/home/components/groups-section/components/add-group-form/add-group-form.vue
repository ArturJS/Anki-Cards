<template>
  <form 
    class="add-group-form" 
    @submit.prevent="handleSubmit">
    <div class="form-field">
      <input 
        v-model="title" 
        class="form-input" 
        type="text" 
        placeholder="Enter group name">
    </div>
    <button 
      type="submit" 
      class="btn btn-primary">
      Add group
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
.add-group-form {
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

.btn {
  transition: all 0.25s ease;
  outline: 0;
  border-radius: 4px;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  margin-bottom: 0;
  border: 0;
  background-color: #1c3866;
  color: #1c3866;
  padding: 6px 12px;
  font: 14px arial;
  font-weight: 600;
  line-height: 26px;
  height: 40px;
  min-height: 40px;

  &-primary {
    color: #fcfcfb;
    background-color: #1c3866;

    &:hover {
      color: #fcfcfb;
      background-color: #627593;
    }
  }
}
</style>
