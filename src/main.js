import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import moment from "moment";
import VueChatScroll from "vue-chat-scroll";


import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.use(VueChatScroll)
Vue.prototype.$http = axios;
axios.defaults.baseURL = "http://157.230.178.85:8001";

Vue.filter("timestamp", value => {
  return moment(value).format("LLL");
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
