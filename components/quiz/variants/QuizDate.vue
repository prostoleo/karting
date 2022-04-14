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
    const max = new Date();
    max.setHours(22);
    max.setMinutes(0);

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

      return future;
    },
  },
};
</script>

<style lang="scss">
//todo import sass datepicker
// @import '@/assets/scss/buefy/index';

.input:active,
.input:focus,
.is-active.input,
.is-active.textarea,
.is-focused.input,
.is-focused.textarea,
.select select.is-active,
.select select.is-focused,
.select select:active,
.select select:focus,
.taginput .is-active.taginput-container.is-focusable,
.taginput .is-focused.taginput-container.is-focusable,
.taginput .taginput-container.is-focusable:active,
.taginput .taginput-container.is-focusable:focus,
.textarea:active,
.textarea:focus {
  border-color: $orangeMy;
  box-shadow: 0 0 0 0.125em rgba($orangeMy, 25%);
}

.datepicker .dropdown .input[readonly].is-active,
.datepicker .dropdown .input[readonly].is-focused,
.datepicker .dropdown .input[readonly]:active,
.datepicker .dropdown .input[readonly]:focus,
.datepicker .dropdown-trigger .input[readonly].is-active,
.datepicker .dropdown-trigger .input[readonly].is-focused,
.datepicker .dropdown-trigger .input[readonly]:active,
.datepicker .dropdown-trigger .input[readonly]:focus {
  box-shadow: 0 0 0 0.125em rgba($orangeMy, 25%);
}

.select:not(.is-multiple):not(.is-loading)::after {
  border-color: $orangeMy;
}

.datepicker .datepicker-table .datepicker-body .datepicker-cell {
  &.is-today {
    border: 1px solid $orangeMy !important;
  }

  &.is-selected {
    background-color: $orangeMy !important;
    color: #fff;
  }
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
