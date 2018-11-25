<template>
  <section class="cards-section">
    Desk id: {{ deskId }}
    <flashcard />
  </section>
</template>

<script>
import Flashcard from './components/flashcard';

export default {
  components: {
    Flashcard
  },
  props: {
    deskId: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.cards-section {
  margin: 0 auto;
  padding: 15px 0;
  max-width: 720px;
}
</style>
