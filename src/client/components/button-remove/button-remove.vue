<template>
  <div 
    class="button-remove" 
    tabindex="0" 
    @click.stop="removeProtection" 
    @mouseleave.self="addProtection" 
    @blur.self="addProtection">
    <div 
      :class="{ '--hidden': isActive }" 
      class="button-remove__protection">
      &times;
    </div>
    <div 
      class="button-remove__confirmation" 
      @click.stop="triggerClick">
      Sure?
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    addProtection() {
      this.isActive = false;
    },
    removeProtection() {
      this.isActive = true;
    },
    triggerClick() {
      this.$emit('click');
    }
  }
};
</script>

<style lang="scss" scoped>
.button-remove {
  display: inline-flex;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  font-size: 14px;
  font-weight: 600;
  line-height: 26px;
  height: 40px;
  min-height: 40px;
  color: #fcfcfb;
  background-color: #ff5722;
  transition: background-color 0.25s ease;
  will-change: background-color;
  user-select: none;

  &:hover {
    background-color: #b70314;
  }

  &__protection {
    background-color: inherit;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: translateX(0);
    transition: transform 0.75s ease;
    will-change: transform;

    &.--hidden {
      transform: translateX(-100%);
    }
  }

  &__confirmation {
    background-color: #ff5722;
    cursor: pointer;
    padding: 6px 12px;
  }
}
</style>
