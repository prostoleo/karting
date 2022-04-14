<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
button {
  display: inline-block;

  padding: 1rem 36px;
  font-family: 'Arimo', sans-serif;
  font-weight: 700;
  line-height: 100%;

  color: white;
  background-color: $redMy-500;

  position: relative;
  overflow: hidden;

  transform-origin: center center;
  transition: all 150ms ease-in-out;

  &:hover,
  &:focus {
    transform: scale(1.075);

    outline: 2px solid $orangeMy;
    outline-offset: 2px;
    transition: all 150ms ease-in-out;
  }
}
</style>
