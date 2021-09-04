<template>
  <div class="text-gray-700 bg-white">
    <Nav :menu="menu" :toggle-nav="showNav" @toggleMenu="toggleMenu" />
    <Nuxt keep-alive />
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Nav from "~/layouts/_partials/Nav.vue";
import Footer from "~/layouts/_partials/Footer.vue";

export default {
  components: {
    Nav,
    Footer
  },
  data() {
    return {
      showNav: false,
      showButtonChat: false
    };
  },
  computed: mapGetters({
    menu: "navbar/get"
  }),
  watch: {
    $route(to, from) {
      this.showNav = false;
    }
  },
  mounted() {},
  methods: {
    toggleMenu(event) {
      this.showNav = event.showNav;
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: this.$device.isMobile && this.showNav ? `overflow-hidden` : ``
      },
      htmlAttrs: {
        lang: "en"
      }
    };
  }
};
</script>
