import Vue from "vue";
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true;
  // Set up your mixin then
  Vue.mixin({
    methods: {
      showLoading() {
        return this.$loading.show({
          container: this.$refs.loading
        });
      }
    }
  });
}
