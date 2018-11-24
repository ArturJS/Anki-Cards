<template>
  <section class="groups-section">
    <add-group-form @submit="handleAddGroup" />
    <ul class="groups-list">
      <li 
        v-for="group in groups" 
        :key="group.id" 
        class="groups-list__item">
        {{ group.title }}
      </li>
    </ul>
  </section>
</template>

<script>
import AddGroupForm from './components/add-group-form';

export default {
  components: {
    AddGroupForm
  },
  data() {
    return {
      groups: []
    };
  },
  methods: {
    handleAddGroup(group) {
      this.groups.push(group);
    }
  }
};
</script>

<style lang="scss" scoped>
.groups-section {
  margin: 0 auto;
  max-width: 720px;
}

.groups-list {
  padding: 0;
  list-style-type: none;

  &__item {
    padding: 10px 15px;
    margin-top: 15px;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    transition: box-shadow 0.25s ease;
    will-change: box-shadow;

    &:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
