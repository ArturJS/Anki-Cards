<template>
  <section class="import-export">
    <button
      type="button"
      class="btn btn-primary btn-export"
      @click="exportData"
    >
      Download
    </button>
    <button
      type="button"
      class="btn btn-primary btn-import"
    >
      Upload
      <input
        type="file"
        accept=".json,application/json"
        @change="importData"
      >
    </button>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import desksGql from '~/apollo/queries/desks.gql';
import cardsGql from '~/apollo/queries/cards.gql';
import { importFile, exportFile } from './utils';

export default {
  methods: {
    async exportData() {
      exportFile({
        filename: 'Anki-Cards-data',
        payload: await this._fetchData()
      });
    },

    async importData(event) {
      const [file] = event.target.files;
      const isNotAFile = !(file instanceof Blob);

      event.target.value = '';

      if (isNotAFile) {
        return;
      }

      const data = await importFile(file);

      await this._uploadData(data);
    },

    async _uploadData({ cards, desks }) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation($desks: [Desk]) {
            buldAddDesks(desks: $desks) @client
          }
        `,
        variables: {
          desks
        }
      });

      await this.$apollo.mutate({
        mutation: gql`
          mutation($cards: [Card]) {
            bulkAddCards(cards: $cards) @client
          }
        `,
        variables: {
          cards
        }
      });
    },

    async _fetchData() {
      const [
        {
          data: { desks }
        },
        {
          data: { cards }
        }
      ] = await Promise.all([
        this.$apollo.query({
          query: desksGql,
          fetchPolicy: 'no-cache'
        }),
        this.$apollo.query({
          query: cardsGql,
          fetchPolicy: 'no-cache'
        })
      ]);

      return {
        desks: desks.map(({ id, title }) => ({ id, title })),
        cards: cards.map(({ id, deskId, question, answer }) => ({
          id,
          deskId,
          question,
          answer
        }))
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.import-export {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0 10px;

  .btn-import {
    position: relative;

    input[type='file'] {
      cursor: pointer;
      text-indent: 9999px;
      position: absolute;
      opacity: 0;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
