<template>
  <div class="radio-wrapper grid grid-cols-2 grid-rows-2 gap-3">
    <div v-for="radioOption in getCurData.options" :key="radioOption.id">
      <b-radio
        v-model="radio"
        name="количество желающих"
        :native-value="radioOption.title"
        type="is-info"
      >
        {{ radioOption.title }}
      </b-radio>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      radio: this.getCurDataOption,
    };
  },

  computed: {
    ...mapGetters(['getCurData', 'getCurDataOption']),
  },

  watch: {
    radio(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.commit('changeChosenOptionOnActiveIndex', newVal);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
