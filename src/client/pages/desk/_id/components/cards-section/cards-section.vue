<template>
  <section class="cards-section">
    <add-card-form @submit="addCard" />
    Desk id: {{ deskId }}
    <ul class="list-unstyled">
      <li 
        v-for="card in cards" 
        :key="card.id">
        <flashcard 
          :header-front="card.question" 
          :header-back="card.answer" />
      </li>
    </ul>
  </section>
</template>

<script>
import AddCardForm from './components/add-card-form';
import Flashcard from './components/flashcard';

export default {
  components: {
    AddCardForm,
    Flashcard
  },
  props: {
    deskId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cards: []
    };
  },
  methods: {
    addCard(card) {
      this.cards.push(card);
    },
    removeCard(cardId) {
      this.cards = this.cards.filter(({ id }) => id !== cardId);
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
