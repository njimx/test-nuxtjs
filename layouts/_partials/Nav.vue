<template>
  <div
    :class="
      `bg-white shadow navbar ` +
        (showNavbar ? `` : `navbar-hidden`) +
        (fixed ? ` fixed` : ` relative`)
    "
  >
    <div
      class="container mx-auto flex items-center justify-between flex-wrap lg:p-4 px-2"
    >
      <nuxt-link
        @click.native="$router.app.refresh()"
        to="/"
        class="inline-block py-2 my-2 text-left"
      >
        <Logo />
      </nuxt-link>
      <div class="block lg:hidden md:hidden">
        <button
          class="inline-block text-gray-700 hover:text-orange focus:outline-none h-6 w-6"
          @click="toggleMenu(true)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        :id="$device.isMobile ? `nav-mobile` : `nav-desktop`"
        :class="
          (showNav ? `show ` : ``) +
            (!$device.isMobile ? ` hidden ` : ``) +
            `w-full lg:flex lg:items-center lg:w-auto md:flex md:items-center md:w-auto lg:block md:block`
        "
      >
        <div class="text-sm md:text-xs lg:text-sm justify-end text-center">
          <nuxt-link
            v-if="$device.isMobile"
            @click.native="
              $router.app.refresh();
              toggleMenu(false);
            "
            to="/"
            class="block w-3/6 md:w-2/5 mx-auto py-2 my-2"
          >
            <Logo />
          </nuxt-link>
          <nuxt-link
            @click.native="
              $router.app.refresh();
              toggleMenu(false);
            "
            v-for="(item, index) in menu"
            :key="index"
            class="block p-4 mt-4 md:inline-block md:mt-0 text-gray-600 hover:text-orange md:mr-3 lg:mr-8 uppercase"
            :to="item.path"
            prefetch
            >{{ item.title }}</nuxt-link
          >
          <a
            href="javascript:;"
            class="block p-4 mt-4 md:inline-block md:mt-0 text-gray-600 hover:text-orange md:mr-3 lg:mr-8 uppercase"
            @click="doLogout"
          >
            Logout
          </a>
        </div>
        <button
          v-if="$device.isMobile"
          class="closeNav text-gray-600"
          aria-label="Close"
          @click="toggleMenu(false)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: { default: () => [], type: Array },
    toggleNav: { default: false, type: Boolean }
  },
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
      fixed: false
    };
  },
  computed: {
    showNav: {
      get() {
        return this.toggleNav;
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    toggleMenu(status) {
      this.$emit("toggleMenu", {
        showNav: status
      });
      this.showNav = status;
    },
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      this.fixed = true;
      if (currentScrollPosition < 130) {
        this.fixed = false;
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 130) {
        return;
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    doLogout() {
      this.$toast.clear();
      this.$toast.info("Are you sure you want to logout ?", {
        duration: 10000,
        keepOnHover: true,
        action: [
          {
            text: "No",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            }
          },
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
              this.$nuxt.$router.push("/");
            }
          }
        ]
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>
