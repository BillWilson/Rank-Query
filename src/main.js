import Vue from 'vue';
import './plugins/vuetify'
import './plugins/firebase'
const Mcl = () => import('./App.vue');
const Hs = () => import('./App2.vue');
import VueClipboard from 'vue-clipboard2';

Vue.use(VueClipboard);
Vue.config.productionTip = true;

let App;

switch (process.env.VUE_APP_APP_SITE) {
  case 'mcl':
    App = Mcl;
    break;

  case 'hs':
    App = Hs;
    break;

  default:
    App = Mcl;
}

new Vue({
  render: h => h(App),
}).$mount('#app');
