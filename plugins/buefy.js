import Vue from 'vue';
// import Buefy from 'buefy';
import {
  Notification,
  Radio,
  Datepicker,
  Timepicker,
  ConfigProgrammatic as Config,
  Icon,
  // Carousel
} from 'buefy';
import 'buefy/dist/buefy.min.css';

/* Config.setOptions({
  defaultIconPack: 'ionicons',
  defaultIconComponent: 'ion-icon',
  defaultIconNext: 'chevron-back-outline',
  defaultIconPrev: 'chevron-forward-outline',

  customIconPacks: {
    ionicons: {
      sizes: {
        default: 'is-size-5',
        'is-small': '',
        'is-medium': 'is-size-3',
        'is-large': 'is-size-1',
      },
      iconPrefix: 'ion-md-',
      internalIcons: {
        check: 'checkmark',
        information: 'information',
        'check-circle': 'checkmark-circle-outline',
        alert: 'alert',
        'alert-circle': 'alert',
        'arrow-up': 'arrow-up',
        'chevron-right': 'arrow-forward',
        'chevron-left': 'arrow-back',
        'chevron-down': 'arrow-down',
        eye: 'eye',
        'eye-off': 'eye-off',
        'menu-down': 'arrow-dropdown',
        'menu-up': 'arrow-dropup',
        'close-circle': 'close-circle-outline',
      },
    },
  },
}); */

// Vue.use(Buefy);

Vue.use(Notification);
Vue.use(Radio);
Vue.use(Datepicker);
Vue.use(Timepicker);
Vue.use(Icon);
Vue.use(Config);

/* Vue.use(Notification, {
  defaultIconPack: 'ionicons',
  defaultIconComponent: 'ion-icon',
  defaultIconNext: 'chevron-back-outline',
  defaultIconPrev: 'chevron-forward-outline',

  customIconPacks: {
    ionicons: {
      sizes: {
        default: 'is-size-5',
        'is-small': '',
        'is-medium': 'is-size-3',
        'is-large': 'is-size-1',
      },
      iconPrefix: 'ion-md-',
      internalIcons: {
        check: 'checkmark',
        information: 'information',
        'check-circle': 'checkmark-circle-outline',
        alert: 'alert',
        'alert-circle': 'alert',
        'arrow-up': 'arrow-up',
        'chevron-right': 'arrow-forward',
        'chevron-left': 'arrow-back',
        'chevron-down': 'arrow-down',
        eye: 'eye',
        'eye-off': 'eye-off',
        'menu-down': 'arrow-dropdown',
        'menu-up': 'arrow-dropup',
        'close-circle': 'close-circle-outline',
      },
    },
  },
}); */
