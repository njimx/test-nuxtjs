<template>
  <div class="block md:flex items-center justify-center">
    <div class="flex items-center">
      <span>Total: {{ paging.total }}</span>
      <select
        @change="selectPerPage"
        class="border rounded cursor-pointer px-2 py-2 ml-3"
      >
        <option
          v-for="(item, index) in showingOptions"
          :key="index"
          :value="item.value"
          :selected="paging.perPage == item.value"
        >
          {{ item.label }}
        </option>
      </select>
      <span class="ml-3">Page {{ paging.current + " / " + paging.last }}</span>
    </div>
    <div class="grid grid-cols-2 divide-x divide-gray-500 text-sm my-6 ml-auto">
      <a
        @click.prevent="previousPage"
        href="javascript:;"
        :class="
          `text-right px-4 py-2 mr-8 hover:text-orange` +
            (paging.current > 1 ? `` : ` text-gray-400 cursor-not-allowed`)
        "
        >&Lt; Previous</a
      >
      <a
        @click.prevent="nextPage"
        href="javascript:;"
        :class="
          `text-left px-12 py-2 hover:text-orange` +
            (paging.current < paging.last
              ? ``
              : ` text-gray-400 cursor-not-allowed`)
        "
        >Next &Gt;</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "UtilsPagination",
  props: {
    paging: { default: {}, type: Object },
    routeName: { default: "", type: String }
  },
  data() {
    return {
      showingOptions: [
        {
          label: "10/page",
          value: 10
        },
        {
          label: "20/page",
          value: 20
        },
        {
          label: "30/page",
          value: 30
        },
        {
          label: "50/page",
          value: 50
        }
      ]
    };
  },
  methods: {
    previousPage() {
      if (this.paging.current - 1 >= 1) {
        this.paging.current =
          this.paging.current - 1 >= 1 ? this.paging.current - 1 : 1;
        this.callback();
      }
    },
    nextPage() {
      if (this.paging.current < this.paging.last) {
        this.paging.current =
          this.paging.current + 1 > this.paging.last
            ? this.paging.last
            : this.paging.current + 1;
        this.callback();
      }
    },
    selectPerPage(e) {
      this.paging.current = 1;
      this.paging.perPage = parseInt(e.target.value);
      this.paging.last = Math.ceil(this.paging.total / this.paging.perPage);
      this.callback();
    },
    callback() {
      this.$router.push({
        name: this.routeName,
        query: { page: this.paging.current, show: this.paging.perPage }
      });
    }
  },
  mounted() {}
};
</script>
