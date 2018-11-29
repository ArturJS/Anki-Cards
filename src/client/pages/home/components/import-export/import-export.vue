<template>
  <section class="import-export">
    <button
      type="button"
      class="btn btn-primary btn-export"
      @click="exportData"
    >
      Export
    </button>
  </section>
</template>

<script>
import FileSaver from 'file-saver';
import desksGql from '~/apollo/queries/desks.gql';
import cardsGql from '~/apollo/queries/cards.gql';

export default {
  methods: {
    async exportData() {
      const [
        {
          data: { desks }
        },
        {
          data: { cards }
        }
      ] = await Promise.all([
        this.$apollo.query({
          query: desksGql
        }),
        this.$apollo.query({
          query: cardsGql
        })
      ]);
      const exportPayload = {
        desks: desks.map(({ id, title }) => ({ id, title })),
        cards: cards.map(({ id, deskId, question, answer }) => ({
          id,
          deskId,
          question,
          answer
        }))
      };
      const jsonExportPayload = JSON.stringify(exportPayload, null, '    ');
      const blob = new Blob([jsonExportPayload], {
        type: 'application/json;charset=utf-8'
      });

      FileSaver.saveAs(blob, 'Anki-Cards-data.json');
    }
  }
};
</script>

<style lang="scss" scoped>
.import-export {
  display: flex;
  width: 100%;
}
</style>
