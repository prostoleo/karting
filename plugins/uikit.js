import Vue from 'vue';

import UIkit from 'uikit/dist/js/uikit-core';
// import Accordion from 'uikit/dist/js/components/'
import 'uikit/dist/css/uikit-core.min.css';

UIkit.container = '#__nuxt';

Vue.prototype.$uikit = UIkit;
