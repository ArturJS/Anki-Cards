<template>
  <div>
    <div 
      v-show="!isToggle" 
      :style="{backgroundColor: colorFront, color: colorTextFront}" 
      class="animated flipInX flashcard" 
      @click="isToggle=!isToggle">
      <div 
        class="card-header" 
        style="padding-bottom: 15px;"> {{ headerFront }} </div>
      <div class="card-content center">
        <p :style="{fontSize: textSizeFront,fontWeight: 'bold'}">{{ front }}</p>
        <img 
          v-if="imgFront!=''" 
          :src="imgFront" 
          width="200" 
          height="200">
      </div>
      <div class="card-footer">{{ footerFront }}</div>
    </div>
    <div 
      v-show="isToggle" 
      :style="{backgroundColor: colorBack, color: colorTextBack}" 
      class="animated flipInX flashcard" 
      @click="isToggle=!isToggle">
      <div 
        class="card-header" 
        style="padding-bottom: 15px;"> {{ headerBack }}</div>
      <div class="card-content center">
        <p :style="{fontSize: textSizeBack, fontWeight: 'bold'}">{{ back }}</p>
        <img 
          v-if="imgBack!=''" 
          :src="imgBack" 
          width="200" 
          height="200">
      </div>
      <div class="card-footer">{{ footerBack }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgFront: {
      type: String,
      default: ''
    },
    imgBack: {
      type: String,
      default: ''
    },
    front: {
      type: String,
      default: ''
    },
    back: {
      type: String,
      default: ''
    },
    textSizeFront: {
      type: String,
      default: '2em'
    },
    textSizeBack: {
      type: String,
      default: '2em'
    },
    colorTextFront: {
      type: String,
      default: 'black'
    },
    colorTextBack: {
      type: String,
      default: 'white'
    },
    colorFront: {
      type: String,
      default: 'white'
    },
    colorBack: {
      type: String,
      default: '#2ecc71'
    },
    headerFront: {
      type: String,
      default: 'Do you know?'
    },
    headerBack: {
      type: String,
      default: 'Answer'
    },
    footerFront: {
      type: String,
      default: 'Click to show Back'
    },
    footerBack: {
      type: String,
      default: 'Click to show Front'
    }
  },
  data() {
    return {
      isToggle: false
    };
  }
};
</script>
<style lang="scss" scoped>
.center {
  text-align: center;
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
