<template>
  <section class="container">
    <cards-section :desk-id="deskId" />
  </section>
</template>

<script>
import CardsSection from './components/cards-section';

export default {
  components: {
    CardsSection
  },
  computed: {
    deskId() {
      return +this.$route.params.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
}
</style>
