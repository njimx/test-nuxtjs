<template>
  <modal
    name="user-form"
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
            name="firstname"
            rules="required"
          >
            <label class="w-32">First name *</label>
            <div class="w-full">
              <input
                v-model="form.firstname"
                :class="`form-control` + (errors.length ? ` errors` : ``)"
                type="text"
                placeholder="First name"
              />
              <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="flex items-center"
            name="lastname"
            rules="required"
          >
            <label class="w-32">Last name *</label>
            <div class="w-full">
              <input
                v-model="form.lastname"
                :class="`form-control` + (errors.length ? ` errors` : ``)"
                type="text"
                placeholder="Last name"
              />
              <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="flex items-center"
            name="email"
            rules="required|email"
          >
            <label class="w-32">Email *</label>
            <div class="w-full">
              <input
                v-model="form.email"
                :class="`form-control` + (errors.length ? ` errors` : ``)"
                type="text"
                placeholder="Email"
              />
              <p class="text-xs text-red-600">{{ errors[0] }}</p>
            </div>
          </ValidationProvider>
          <div class="flex items-center">
            <label class="w-32">Phone number *</label>
            <div class="w-full">
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center h-16">
                  <v-select
                    :value="form.countrycode"
                    @input="selectCode"
                    :options="codes"
                    label="dial_code"
                    :clearable="false"
                    :filter="searchCountry"
                    class="select-code"
                  >
                    <template v-slot:option="option">
                      <p class="flex items-center">
                        <span>{{
                          option.name + " (" + option.code + ")"
                        }}</span>
                        <span class="ml-auto">{{ option.dial_code }}</span>
                      </p>
                    </template>
                  </v-select>
                </div>
                <ValidationProvider
                  v-slot="{ errors }"
                  tag="div"
                  name="phone"
                  rules="required|digits:9"
                >
                  <input
                    v-model="form.phone"
                    :class="
                      `phone form-control` + (errors.length ? ` errors` : ``)
                    "
                    type="number"
                    maxlength="9"
                    placeholder="Phone number"
                  />
                  <p class="text-xs text-red-600">{{ errors[0] }}</p>
                </ValidationProvider>
              </div>
            </div>
          </div>
          <ValidationProvider
            v-slot="{ errors }"
            tag="div"
            class="flex items-center"
            name="role"
            rules="required"
          >
            <label class="w-32">Role *</label>
            <div class="w-full">
              <select class="form-control" v-model="form.role">
                <option
                  v-for="(item, index) in roles"
                  :key="index"
                  :value="item.slug"
                  :selected="form.role == item.slug"
                >
                  {{ item.name }}
                </option>
              </select>
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
import Fuse from "fuse.js";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  name: "FormUser",
  props: {
    userData: {
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
          this.title = "Edit user";
          return Object.assign({}, this.item);
        } else {
          this.editable = false;
          this.title = "Create new user";
          return {
            role: "user",
            countrycode: "+84"
          };
        }
      },
      set(val) {
        return val;
      }
    },
    codes: {
      get() {
        return this.$store.state.countryCodes.data;
      }
    },
    roles: {
      get() {
        return this.$store.state.roles.data;
      }
    }
  },
  data() {
    return {
      title: "Create new user",
      error: {},
      editable: false
    };
  },
  methods: {
    searchCountry(options, search) {
      const fuse = new Fuse(options, {
        keys: ["name", "code", "dial_code"],
        shouldSort: true
      });
      return search.length
        ? fuse.search(search).map(({ item }) => item)
        : fuse.list;
    },
    selectCode(e) {
      this.form.countrycode = e.dial_code;
      this.$forceUpdate();
    },
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
        const index = this.userData.findIndex(
          item => item._id == this.form._id
        );
        let checkData = this.userData.filter(
          item => item !== this.userData[index]
        );
        if (checkData.findIndex(item => item.email == this.form.email) !== -1) {
          this.error = {
            errors: [{ email: "Email already registered!" }]
          };
          loader.hide();
          return false;
        }
        this.userData[index] = this.form;
      } else {
        if (
          this.userData.findIndex(item => item.email == this.form.email) !== -1
        ) {
          this.error = {
            errors: [{ email: "Email already registered!" }]
          };
          loader.hide();
          return false;
        }
        const uuid = require("uuid");
        this.form._id = uuid.v4();
        this.userData.push(this.form);
      }
      await this.$axios
        .$post("/api/update-users", {
          data: this.userData
        })
        .then(() => {
          const message = this.editable
            ? "Edit user successfully !"
            : "Create user successfully !";
          this.$toast.success(message);
          if (!this.editable) {
            this.paging.current = this.paging.last;
            this.$router.push({
              name: this.routeName,
              query: { page: this.paging.current, show: this.paging.perPage }
            });
          }
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
      return this.$modal.hide("user-form");
    }
  },
  mounted() {}
};
</script>
