<template>
  <section class="cards-section">
    <add-card-form @submit="addCard" />
    Desk id: {{ deskId }}
    <ul class="list-unstyled">
      <li
        v-for="card in cards"
        :key="card.id"
      >
        <flashcard
          :id="card.id"
          :question="card.question"
          :answer="card.answer"
          @remove="removeCard"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import cardsGql from '~/apollo/modules/cards/cards.gql';
import AddCardForm from './components/add-card-form';
import Flashcard from './components/flashcard';

export default {
  apollo: {
    cards: {
      query: cardsGql,
      variables() {
        return {
          deskId: this.deskId
        };
      },
      fetchPolicy: 'no-cache'
    }
  },
  components: {
    AddCardForm,
    Flashcard
  },
  props: {
    deskId: {
      type: String,
      required: true
    }
  },
  methods: {
    addCard(card) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($card: Card!) {
            addCard(card: $card) @client
          }
        `,
        variables: {
          card: {
            ...card,
            deskId: this.deskId
          }
        }
      });
    },
    removeCard(cardId) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($id: ID!) {
            removeCard(id: $id) @client
          }
        `,
        variables: {
          id: cardId
        }
      });
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
