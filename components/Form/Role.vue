<template>
  <modal
    name="role-form"
    @closed="closeModal"
    :minHeight="550"
    :adaptive="true"
    height="auto"
    :clickToClose="false"
  >
    <div ref="loading" class="py-4 px-8">
      <div class="text-center m-4">
        <h2 class="text-xl">{{ title }}</h2>
      </div>
      <div class="divide-y divide-gray-300">
        <ValidationObserver tag="form" @submit.prevent="submit" ref="form">
          <UtilsShowError :error="error" />
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="flex items-center"
            name="name"
            rules="required"
          >
            <label class="w-32">Role Name *</label>
            <div class="w-full">
              <input
                v-model="form.name"
                :class="`form-control` + (errors.length ? ` errors` : ``)"
                type="text"
                placeholder="Role name"
              />
              <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="flex items-center"
            name="slug"
            rules="required"
          >
            <label class="w-32">Slug *</label>
            <div class="w-full">
              <input
                v-model="form.slug"
                :class="`form-control` + (errors.length ? ` errors` : ``)"
                type="text"
                placeholder="Slug"
              />
              <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <div class="grid grid-cols-2 gap-x-24 my-6">
            <button
              @click="closeModal"
              type="button"
              class="py-3 bg-gray-100 border border-gray-200 w-full rounded-full hover:bg-gray-200 outline-none focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
              Back
            </button>
            <button type="submit" class="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save
            </button>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </modal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  name: "FormRole",
  props: {
    roleData: {
      default: () => {
        return [];
      },
      type: Array
    },
    item: { default: null, type: Object },
    paging: { default: {}, type: Object },
    routeName: { default: "", type: String }
  },
  computed: {
    form: {
      get() {
        if (Object.keys(this.item).length) {
          this.editable = true;
          this.title = "Edit role";
          return Object.assign({}, this.item);
        } else {
          this.editable = false;
          this.title = "Create new role";
          return {};
        }
      },
      set(val) {
        return val;
      }
    }
  },
  data() {
    return {
      title: "Create new user",
      roles: [],
      codes: [],
      error: {},
      editable: false
    };
  },
  methods: {
    async submit() {
      let loader = this.showLoading();
      this.error = {};
      const isValid = await this.$refs.form.validate();
      if (!isValid) {
        this.error = {
          errors: [{ message: "Please complete all required fields !" }]
        };
        loader.hide();
        return false;
      }
      if (this.editable) {
        const index = this.roleData.findIndex(
          item => item._id == this.form._id
        );
        let checkData = this.roleData.filter(
          item => item !== this.roleData[index]
        );
        if (checkData.findIndex(item => item.slug == this.form.slug) !== -1) {
          this.error = {
            errors: [{ email: "Role slug already registered!" }]
          };
          loader.hide();
          return false;
        }
        this.roleData[index] = this.form;
      } else {
        if (
          this.roleData.findIndex(item => item.slug == this.form.slug) !== -1
        ) {
          this.error = {
            errors: [{ email: "Role slug already registered!" }]
          };
          loader.hide();
          return false;
        }
        const uuid = require("uuid");
        this.form._id = uuid.v4();
        this.roleData.push(this.form);
      }
      await this.$axios
        .$post("/api/update-roles", {
          data: this.roleData
        })
        .then(() => {
          const message = this.editable
            ? "Edit role successfully !"
            : "Create role successfully !";
          this.$toast.success(message);
          if (!this.editable) {
            this.paging.current = this.paging.last;
            this.$router.push({
              name: this.routeName,
              query: { page: this.paging.current, show: this.paging.perPage }
            });
          }
          // Update Roles Store
          this.$store.commit("roles/setData", this.roleData);

          loader.hide();
          this.closeModal();
        })
        .catch(error => {
          this.error = {
            error: "An error occured, please try again!"
          };
          loader.hide();
          this.closeModal();
        });
    },
    closeModal() {
      this.error = {};
      this.$emit("closeModal");
      return this.$modal.hide("role-form");
    }
  },
  mounted() {}
};
</script>
