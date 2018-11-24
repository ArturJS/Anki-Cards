<template>
  <section class="container">
    <groups-section />
  </section>
</template>

<script>
import GroupsSection from './components/groups-section';

export default {
  components: {
    GroupsSection
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  display: flex;
}
</style>
