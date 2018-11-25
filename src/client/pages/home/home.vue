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
  min-height: 100vh;
  display: flex;
}
</style>
