<template>
  <section class="container">
    <import-export />
    <desks-section />
  </section>
</template>

<script>
import DesksSection from './components/desks-section';
import ImportExport from './components/import-export';

export default {
  components: {
    DesksSection,
    ImportExport
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 450px;
  margin: 0 auto;
  min-height: 100vh;
}
</style>
