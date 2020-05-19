import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vueBemCn from "vue-bem-cn";

Vue.config.productionTip = false;

Vue.use(vueBemCn, { methodName: 'bem', hyphenate: true })

new Vue({
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
