<template>
  <section class="desks-section">
    <add-desk-form @submit="addDesk" />
    <ul class="desks-list">
      <li 
        v-for="desk in desks" 
        :key="desk.id" 
        class="desks-list__item">
        <div class="desks-list__item-content">
          {{ desk.title }}
        </div>
        <button 
          type="button" 
          class="btn btn-danger" 
          @click="removeDesk(desk.id)">
          &times;
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
import AddDeskForm from './components/add-desk-form';

export default {
  components: {
    AddDeskForm
  },
  data() {
    return {
      desks: []
    };
  },
  methods: {
    addDesk(desk) {
      this.desks.push(desk);
    },
    removeDesk(deskId) {
      this.desks = this.desks.filter(({ id }) => id !== deskId);
    }
  }
};
</script>

<style lang="scss" scoped>
.desks-section {
  margin: 0 auto;
  padding: 15px 0;
  max-width: 720px;
}

.desks-list {
  padding: 0;
  list-style-type: none;

  &__item {
    display: flex;
    padding: 10px 15px;
    margin-top: 15px;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    transition: box-shadow 0.25s ease;
    will-change: box-shadow;

    &:hover {
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    }

    &-content {
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }
}
</style>
