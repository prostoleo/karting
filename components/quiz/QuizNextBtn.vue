<template>
  <button
    class="to-next-q shadow bg-red-500 text-lg text-white font-semibold px-[1em] py-[0.5em]"
    @click="$emit('btn-click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  emits: ['btn-click'],
};
</script>

<style lang="scss" scoped></style>
