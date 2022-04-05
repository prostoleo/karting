<template>
  <div
    v-if="loading"
    class="loader-overlay bg-dark-800/75 fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center z-50"
  >
    <div class="ring">
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: transparent;
  border: 3px solid #3c3c3c;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  font-family: sans-serif;
  font-size: 20px;
  color: $redMy-500;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px $redMy-500;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
.ring:before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid $redMy-500;
  border-right: 3px solid $redMy-500;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}
span {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: animate 2s linear infinite;
}
span:before {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: $redMy-500;
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px $redMy-500;
}
@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}
</style>
