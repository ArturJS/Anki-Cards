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
      const { data } = await this.$apollo.query({
        query: desksGql
      });
      const exportPayload = {
        desks: data.desks.map(({ id, title }) => ({ id, title }))
      };
      const jsonExportPayload = JSON.stringify(exportPayload, null, '    ');
      const blob = new Blob([jsonExportPayload], {
        type: 'text/plain;charset=utf-8'
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
