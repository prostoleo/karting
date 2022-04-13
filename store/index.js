import { formatDate, formatTime } from '~/utils/dt/date';

export const state = () => ({
  activeIndex: 1,

  kartsOptions: null,

  data: {
    1: {
      id: '1',
      type: 'radio',
      title: 'Укажите количество желающих',
      chosenOption: '',
      options: [
        {
          id: '1-1',
          title: '1',
        },
        {
          id: '1-2',
          title: '2',
        },
        {
          id: '1-3',
          title: '3',
        },
        {
          id: '1-4',
          title: '4+',
        },
      ],
    },
    2: {
      id: '2',
      type: 'date',
      title: 'Выберите дату',
      chosenOption: '',
    },
    3: {
      id: '3',
      type: 'time',
      title: 'Выберите время',
      chosenOption: '',
    },
    4: {
      id: '4',
      type: 'radio',
      title: 'У вас есть наша карта?',
      chosenOption: '',
      options: [
        {
          id: '4-1',
          title: 'Да',
        },
        {
          id: '4-2',
          title: 'Нет',
        },
      ],
    },
    5: {
      id: '5',
      type: 'slider-radio',
      title: 'Выберите карт',
      chosenOption: '',
      options: getters.getKartsOptions,
    },
    6: {
      type: 'radio',
      title: 'Укажите удобный способ связи, чтобы закрепить скидку',
      chosenOption: '',
      options: [
        {
          id: '6-1',
          title: 'Telegram',
        },
        {
          id: '6-2',
          title: 'WhatsApp',
        },
        {
          id: '6-3',
          title: 'Viber',
        },
        {
          id: '6-4',
          title: 'Телефон',
        },
      ],
    },
  },
});

export const getters = {
  getActiveIndex(state) {
    return state.activeIndex;
  },
  getTotalQuestions(state) {
    return Object.keys(state.data).length;
  },
  getPercentageProgress(state, getters) {
    const percent = Math.round(
      (getters.getActiveIndex / getters.getTotalQuestions) * 100
    );
    // console.log('percent: ', percent);

    return percent > 100 ? 100 : percent;
  },

  getCurData(state, getters) {
    const curData = state.data[getters.getActiveIndex];
    // console.log('curData: ', curData);

    return curData ?? null;
  },

  getCurDataOption(state, getters) {
    if (!getters.getCurData) {
      return null;
    }

    const chosenOption = getters.getCurData.chosenOption;

    // если массив ответов
    if (Array.isArray(chosenOption)) {
      return chosenOption.length === 0 ? null : chosenOption;
    }

    // если просто строчка
    if (typeof chosenOption === 'string') {
      return chosenOption.trim().length === 0 ? null : chosenOption;
    }

    // если дата
    if (typeof chosenOption.getMonth === 'function') {
      return chosenOption;
    }
  },

  getDataForQuizSubmit: (state) => {
    const newObj = Object.values(state.data).reduce((acc, val) => {
      // console.log('val: ', val);
      /* typeof val.chosenOption === 'string'
        ? (acc[val.title] = val.chosenOption)
        : (acc[val.title] = val.chosenOption.join(';')); */

      if (typeof val.chosenOption === 'string') {
        acc[val.title] = val.chosenOption;
        return acc;
      }
      if (Array.isArray(val.chosenOption)) {
        acc[val.title] = val.chosenOption.join(';');
      }

      if (typeof val.chosenOption.getMonth === 'function') {
        if (val.type === 'date') {
          const date = formatDate(val.chosenOption);
          acc[val.title] = date;
        }

        if (val.type === 'time') {
          const time = formatTime(val.chosenOption);
          acc[val.title] = time;
        }

        return acc;
      }

      return acc;
    }, {});

    return newObj;
  },

  getKartsOptions(state) {
    return state.kartsOptions;
  },
};

export const mutations = {
  incrementActiveIndex(state) {
    if (getters.getKartsOptions !== getters.getActiveIndex) state.activeIndex++;
  },

  changeChosenOptionOnActiveIndex(state, data) {
    console.log('data: ', data);
    const chosenOption = state.data[state.activeIndex].chosenOption;
    // console.log('data: ', data);

    if (Array.isArray(chosenOption)) {
      state.data[state.activeIndex].chosenOption.push(data);

      return;
    }
    state.data[state.activeIndex].chosenOption = data;
  },

  setKartsOptions(state, info) {
    if (info) {
      state.kartsOptions = info;
    }
  },
};
