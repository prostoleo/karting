<template>
  <div
    class="custom-progress rounded-lg bg-gray-100 w-full overflow-hidden relative h-4 mb-5"
  >
    <!-- bg-blue-500 -->
    <span
      class="fill bg-blue-500 absolute left-0 top-0 bottom-0 text-white text-[12px] block w-full h-full p-[0.2em] inline-flex justify-center items-center transition-all duration-600 ease-in"
      :style="`width: ${getPercentageProgress}%`"
    >
      <span class="text font-semibold w-max">{{ getPercentageProgress }}%</span>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getPercentageProgress']),
  },
};
</script>

<style lang="scss" scoped>
.fill {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;

    background-image: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    background-size: 15px 100%;

    z-index: 1;
    animation: move 5s linear infinite;
  }
}

@keyframes move {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 60px 60px;
  }
}
</style>
