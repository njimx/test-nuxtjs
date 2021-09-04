<template>
  <footer class="bg-gray-100 py-6 mt-2 text-sm">
    <div class="container mx-auto text-center">
      <p>Copyright @{{ currentYear }} njim</p>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    menu: { default: null, type: Array },
    infos: { default: () => {}, type: Object }
  },
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>
