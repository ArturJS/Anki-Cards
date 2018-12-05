<template>
  <div>
    <div
      v-show="!isToggle"
      class="animated flipInX flashcard flashcard__front-side"
      @click="toggleSide()"
    >
      <div class="card-header"> {{ question }} </div>
      <div class="center">
        <button-remove @click="handleRemove" />
      </div>
    </div>
    <div
      v-show="isToggle"
      class="animated flipInX flashcard flashcard__back-side"
      @click="toggleSide()"
    >
      <div class="card-header"> {{ answer }}</div>
    </div>
  </div>
</template>

<script>
import ButtonRemove from '~/components/button-remove';

export default {
  components: {
    ButtonRemove
  },
  props: {
    id: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isToggle: false
    };
  },
  methods: {
    toggleSide() {
      this.isToggle = !this.isToggle;
    },
    handleRemove() {
      this.$emit('remove', this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flashcard {
  cursor: pointer;
  border-radius: 10px;
  margin: 20px;
  padding: 25px;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.4);
  text-align: center;

  &:hover {
    box-shadow: 0 0px 25px rgba(0, 0, 0, 0.8);
  }

  &__front-side {
    background-color: #ffffff;
    color: #000000;
  }

  &__back-side {
    background-color: #2ecc71;
    color: #ffffff;
  }
}

.card-header {
  padding-bottom: 15px;
  font-size: 2em;
}

.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}

@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

.flipInX {
  backface-visibility: visible !important;
  animation-name: flipInX;
}
</style>
