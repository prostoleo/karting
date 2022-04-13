<template>
  <div>
    <b-datepicker
      v-model="selected"
      :show-week-number="showWeekNumber"
      :first-day-of-week="1"
      :years-range="[0, 0]"
      :min-date="minDate"
      :max-date="maxDate"
      locale="ru-Ru"
      placeholder="Нажмите, чтобы выбрать дату"
      icon="calendar-outline"
      :icon-right="selected ? 'close-circle' : ''"
      icon-right-clickable
      trap-focus
      @icon-right-click="clearDate"
    >
      <!-- :mobile-native="false" -->
    </b-datepicker>
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
    max.setHours(22);
    max.setMinutes(0);
    console.log('max: ', max);

    const minDate = new Date();

    return {
      selected: this.getCurDataOption,
      showWeekNumber: false,
      minDate,
      maxDate: this.calcMaxDate(),
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

    daysToMiliseconds(days) {
      return days * 24 * 60 * 60 * 1000;
    },

    calcMaxDate() {
      const future = new Date(Date.now() + this.daysToMiliseconds(90));
      console.log('future: ', future);

      return future;
    },
  },
};
</script>

<style lang="scss">
//todo import sass datepicker
@import '@/assets/scss/buefy/index';

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: $orangeMy;
}

header.datepicker-header {
  i {
    color: $orangeMy;
  }
}

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

<style lang="scss" scoped></style>
