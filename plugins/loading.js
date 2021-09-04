import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Loading, {
  color: "#FF6700",
  width: 50,
  height: 50,
  backgroundColor: "#ffffff",
  opacity: 0.7,
  zIndex: 999,
  loader: "spinner",
  isFullPage: false
});
