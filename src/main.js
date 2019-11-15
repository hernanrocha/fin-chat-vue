import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from "axios";
import moment from "moment";
import VueChatScroll from "vue-chat-scroll";


import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import vuetify from './plugins/vuetify';
import store from './plugins/store';

Vue.config.productionTip = false;

Vue.use(VueChatScroll)
Vue.prototype.$http = axios;
axios.defaults.baseURL = process.env.VUE_APP_ROOT_API;

Vue.filter("timestamp", value => {
  return moment(value).format("LLL");
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
