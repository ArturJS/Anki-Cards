<template>
  <section class="desks-section">
    <add-desk-form @submit="addDesk" />
    <ul class="desks-list">
      <li
        v-for="desk in desks"
        :key="desk.id"
        class="desks-list__item"
      >
        <div class="desks-list__item-content">
          <nuxt-link
            :to="{ name: 'desk-id', params: { id: desk.id } }"
            class="desks-list__item-link"
          >
            {{ desk.title }}
          </nuxt-link>
        </div>
        <button-remove @click="removeDesk(desk.id)" />
      </li>
    </ul>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import desksGql from '~/apollo/queries/desks.gql';
import ButtonRemove from '~/components/button-remove';
import AddDeskForm from './components/add-desk-form';

export default {
  apollo: {
    desks: {
      query: desksGql
    }
  },
  components: {
    AddDeskForm,
    ButtonRemove
  },
  methods: {
    addDesk(desk) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($desk: Desk!) {
            addDesk(desk: $desk) @client
          }
        `,
        variables: {
          desk
        }
      });
    },
    removeDesk(deskId) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($id: Int!) {
            removeDesk(id: $id) @client
          }
        `,
        variables: {
          id: deskId
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.desks-section {
  margin: 0 auto;
  padding: 15px 0;
  width: 100%;
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

    &-link {
      max-width: 10em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-bottom-color 0.25s ease;
      will-change: border-bottom-color;

      &:hover {
        border-bottom-color: #7378f1;
      }
    }
  }
}
</style>
