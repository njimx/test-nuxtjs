<template>
  <div>
    <div class="container mx-auto my-12">
      <section class="my-6 mx-2 flex">
        <h1 class="py-2 text-lg uppercase text-black">
          Roles List
        </h1>
        <button
          @click="createRole"
          class="px-4 py-2 bg-gray-700 text-white hover:bg-gray-300 hover:text-gray-700 ml-auto rounded-full"
        >
          Create New Role
        </button>
      </section>
      <section class="mb-10">
        <div v-if="roles.length">
          <table class="w-full text-sm md:text-base">
            <thead class="border-b border-gray-400">
              <tr class="bg-white odd:bg-gray-100 text-left">
                <th width="40%">Name</th>
                <th width="40%">Slug</th>
                <th width="20%">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-400">
              <tr
                @click="editRow(item)"
                v-for="(item, index) in roles"
                :key="index"
                class="bg-white odd:bg-gray-100 p-4 break-words"
              >
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.slug }}
                </td>
                <td>
                  <ButtonDelete
                    :item="item.name"
                    :index="index"
                    @deleteItem="deleteItem"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <UtilsPagination :routeName="$route.name" :paging="paging" />
        </div>
        <div v-else class="bg-gray-100 p-4 text-center">
          Empty list
        </div>
      </section>
    </div>
    <FormRole
      :item="itemRow"
      :roleData="roleData"
      :routeName="$route.name"
      :paging="paging"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, query }) {
    const perPage = query.show ?? 10;
    const data = {
      roleData: [],
      roles: [],
      paging: {
        perPage: perPage,
        current: query.page ? parseInt(query.page) : 1,
        last: 1,
        total: 0
      },
      itemRow: {}
    };
    const from = (data.paging.current - 1) * perPage;
    const to = data.paging.current * perPage;
    const roles = await $content("roles").fetch();
    const roleData = roles.data;
    data.roleData = roleData;
    data.roles = roleData.slice(from, to);
    data.paging.total = roleData.length;
    data.paging.last = Math.ceil(roleData.length / perPage);
    return data;
  },
  watch: {
    "paging.current": {
      handler(val) {
        if (val != this.$route.query.page) {
          this.paging.current = val;
          this.fetchData();
        }
      },
      deep: true
    },
    "paging.perPage": {
      handler(val) {
        if (val != this.$route.query.show) {
          this.paging.perPage = val;
          this.fetchData();
        }
      },
      deep: true
    }
  },
  data() {
    return {};
  },
  methods: {
    fetchData() {
      let from = (this.paging.current - 1) * this.paging.perPage;
      let to = this.paging.current * this.paging.perPage;
      this.roles = this.roleData.slice(from, to);
    },
    deleteItem(e) {
      const value = this.roles[e.index];
      this.roles.splice(e.index, 1);
      this.roleData = this.roleData.filter(item => item !== value);
      this.$axios
        .$post("/api/update-roles", {
          data: this.roleData
        })
        .then(() => {
          this.$toast.success("Delete item successfully !");
          this.fetchData();
        });
    },
    createRole() {
      this.$toast.clear();
      this.itemRow = {};
      return this.$modal.show("role-form");
    },
    editRow(item) {
      this.$toast.clear();
      this.itemRow = item;
      return this.$modal.show("role-form");
    }
  },
  mounted() {},
  head() {
    return {
      title: "Roles List",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Roles Page"
        }
      ]
    };
  }
};
</script>
