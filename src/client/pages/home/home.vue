<template>
  <section class="container">
    <desks-section />
  </section>
</template>

<script>
import DesksSection from './components/desks-section';

export default {
  components: {
    DesksSection
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
