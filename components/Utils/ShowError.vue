<template>
  <div
    v-if="
      (errorData.errors && Object.keys(errorData.errors).length) ||
        (errorData.message && errorData.message != '')
    "
    class="text-red-600 text-sm bg-red-100 border border-red-600 rounded-lg p-4"
  >
    <div v-if="errorData.errors && Object.keys(errorData.errors).length">
      <div v-for="(item, index) in errorData.errors" :key="index">
        <ul>
          <li v-for="(it, idx) in item" :key="idx">{{ it }}</li>
        </ul>
      </div>
    </div>
    <div v-else>
      <p>{{ errorData.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UtilsShowError",
  props: {
    error: { default: {}, type: Object }
  },
  data() {
    return {};
  },
  computed: {
    errorData: {
      get() {
        return this.error;
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {}
};
</script>
