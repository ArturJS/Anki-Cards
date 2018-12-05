<template>
  <form
    class="add-card-form"
    @submit.prevent="handleSubmit"
  >
    <div class="form-field">
      <input
        v-model="question"
        class="form-input"
        type="text"
        placeholder="Enter question"
      >
    </div>
    <div class="form-field">
      <input
        v-model="answer"
        class="form-input"
        type="text"
        placeholder="Enter answer"
      >
    </div>
    <button
      type="submit"
      class="btn btn-primary btn-submit"
    >
      Add card
    </button>
  </form>
</template>

<script>
import nanoId from 'nano-id';

export default {
  data() {
    return {
      question: '',
      answer: ''
    };
  },
  methods: {
    handleSubmit() {
      if (!this.question.trim() || !this.answer.trim()) {
        return;
      }

      this.$emit('submit', {
        id: nanoId(),
        question: this.question,
        answer: this.answer
      });

      this.question = '';
      this.answer = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.add-card-form {
  margin-bottom: 15px;
}

.form-field,
.btn-submit {
  margin-top: 15px;
  width: 100%;
}
</style>
