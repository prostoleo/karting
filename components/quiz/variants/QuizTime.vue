<template>
  <div>
    <b-timepicker
      v-model="selected"
      :min-time="minTime"
      :max-time="maxTime"
      :increment-minutes="15"
      inline
      locale="ru-Ru"
    >
      <!-- icon-pack="ionicons" -->
      <!-- icon-prev="arrow-dropleft" -->
      <!-- icon-next="arrow-dropright" -->
    </b-timepicker>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    const min = new Date();
    min.setHours(10);
    min.setMinutes(0);
    console.log('min: ', min);
    const max = new Date();
    max.setHours(21);
    max.setMinutes(30);
    console.log('max: ', max);

    return {
      selected: this.getCurDataOption,
      minTime: min,
      maxTime: max,
    };
  },

  computed: {
    ...mapGetters(['getCurDataOption']),
  },

  watch: {
    selected(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.commit('changeChosenOptionOnActiveIndex', this.selected);
      }
    },
  },

  mounted() {
    // window.$nuxt.$buefy.config.setOptions(customIconConfig);
  },

  methods: {
    clearDate() {
      this.selected = '';
      this.$store.commit('resetChosenOptionOnActiveIndex');
    },
  },
};
</script>

<style lang="scss">
//todo import sass datepicker
@import '@/assets/scss/buefy/index';

.timepicker .dropdown-content .control .select {
  margin: 0;

  select {
    // font-weight: 600;
    // padding-right: calc(0.75em - 1px);
    // border: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}
</style>

<style lang="scss" scoped>
.timepicker.control {
  width: fit-content;
}
</style>
