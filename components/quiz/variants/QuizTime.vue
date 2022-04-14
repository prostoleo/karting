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
    const max = new Date();
    max.setHours(21);
    max.setMinutes(30);

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

  methods: {
    clearDate() {
      this.selected = '';
      this.$store.commit('resetChosenOptionOnActiveIndex');
    },
  },
};
</script>

<style lang="scss">
.timepicker .dropdown-content .control .select {
  margin: 0;

  select {
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
