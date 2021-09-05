<template>
  <div>
    <div class="container mx-auto my-12">
      <section class="my-6 mx-2 flex">
        <h1 class="py-2 text-lg uppercase text-black">
          Users List
        </h1>
        <button
          @click="createUser"
          class="px-4 py-2 bg-gray-700 text-white hover:bg-gray-300 hover:text-gray-700 ml-auto rounded-full"
        >
          Create New User
        </button>
      </section>
      <section class="mb-10">
        <div v-if="users.length">
          <table class="w-full text-sm md:text-base">
            <thead class="border-b border-gray-400">
              <tr class="bg-white odd:bg-gray-100 text-left">
                <th width="20%">Name</th>
                <th width="25%">Email</th>
                <th width="25%">Phone</th>
                <th width="15%">Role</th>
                <th class="hidden md:block w-full" width="15%">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-400">
              <tr
                @click="editRow(item)"
                v-for="(item, index) in users"
                :key="index"
                class="bg-white odd:bg-gray-100 p-4 break-words"
              >
                <td>
                  {{ item.lastname + " " + item.firstname }}
                </td>
                <td>
                  {{ item.email }}
                </td>
                <td>
                  {{ item.countrycode + " " + item.phone }}
                </td>
                <td>
                  <p>{{ item.role }}</p>
                  <ButtonDelete
                    class="text-xs"
                    v-if="$device.isMobile"
                    :item="item.lastname + ` ` + item.firstname"
                    :index="index"
                    @deleteItem="deleteItem"
                  />
                </td>
                <td class="hidden md:block">
                  <ButtonDelete
                    :item="item.lastname + ` ` + item.firstname"
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
    <FormUser
      :key="keyRow"
      :item="userRow"
      :userData="userData"
      :routeName="$route.name"
      :paging="paging"
      @closeModal="closeModal"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, query }) {
    const perPage = query.show ?? 10;
    const data = {
      userData: [],
      users: [],
      paging: {
        perPage: perPage,
        current: query.page ? parseInt(query.page) : 1,
        last: 1,
        total: 0
      },
      userRow: {},
      keyRow: 1
    };
    const from = (data.paging.current - 1) * perPage;
    const to = data.paging.current * perPage;
    const users = await $content("users").fetch();
    const userData = users.data;
    data.userData = userData;
    data.users = userData.slice(from, to);
    data.paging.total = userData.length;
    data.paging.last = Math.ceil(userData.length / perPage);
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
      this.users = this.userData.slice(from, to);
    },
    deleteItem(e) {
      const value = this.users[e.index];
      this.users.splice(e.index, 1);
      this.userData = this.userData.filter(item => item !== value);
      this.$axios
        .$post("/api/update-users", {
          data: this.userData
        })
        .then(() => {
          this.$toast.success("Delete item successfully !");
          this.fetchData();
        });
    },
    createUser() {
      this.$toast.clear();
      this.userRow = {};
      return this.$modal.show("user-form");
    },
    editRow(item) {
      this.$toast.clear();
      this.userRow = item;
      return this.$modal.show("user-form");
    },
    closeModal() {
      this.keyRow++;
    }
  },
  mounted() {},
  head() {
    return {
      title: "Users List",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Users Page"
        }
      ]
    };
  }
};
</script>
