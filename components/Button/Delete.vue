<template>
  <a @click="deleteItem" href="javascript:;" class="hover:underline">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 md:h-6 md:w-6 inline-block"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
    Delete
  </a>
</template>

<script>
export default {
  name: "ButtonDelete",
  props: {
    index: { default: null, type: Number },
    item: { default: "", type: String }
  },
  methods: {
    deleteItem(e) {
      e.stopPropagation();
      this.$toast.clear();
      this.$toast.show("Are you sure you want to delete " + this.item + " ?", {
        duration: 10000,
        keepOnHover: true,
        singleton: true,
        action: [
          {
            text: "No",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
              this.current = null;
            }
          },
          {
            text: "Yes",
            onClick: (e, toastObject) => {
              this.$toast.clear();
              this.$emit("deleteItem", {
                index: this.index
              });
            }
          }
        ]
      });
    }
  },
  mounted() {}
};
</script>
