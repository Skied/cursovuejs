import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// BootstrapVue
import BootstrapVue from 'bootstrap-vue';
// Fontawesome
import {FontAwesomeIcon} from './fontawesome';
// VeeValidate
import {extend, ValidationProvider} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';
// Notifications
import Notifications from 'vue-notification';
// BootstrapVue
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
// jwt-decode
import jwtDecode from 'jwt-decode';
// Socket.io-client
import VueSocketIOExt from 'vue-socket.io-extended';
import $socket from './socket-instance';
// i18n

// Vue-moment
Vue.use(require('vue-moment'));
// BootstrapVue
Vue.use(BootstrapVue);
// Fontawesome
Vue.component('font-awesome-icon', FontAwesomeIcon);
// Axios
Vue.use(VueAxios, axios);
// VeeValidate
for (let rule in rules) {
  // add the rule
  // @ts-ignore
  extend(rule, rules[rule]);
}
Vue.component('ValidationProvider', ValidationProvider);
// Notifications
Vue.use(Notifications);
// Socket.io-client
Vue.use(VueSocketIOExt, $socket, {store});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created: () => {
  },
  sockets: {
    connect() {
      console.log('Websocket connected');
    },
    disconnect() {
      console.log('Websocket disconnected');
    },
  },
}).$mount('#app');
