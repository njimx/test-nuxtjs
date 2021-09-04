# Build Setup

This is just a demo NuxtJs project!

### Requirements

    Node version 14.16.0

### Installation

```bash
# clone this Git repository and create first an .env file by following
$ cp .env.example .env

# install dependencies
$ yarn

# serve with hot reload at localhost:7777
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

# Features

- NuxtJs => Automatic transpilation and bundling (with webpack and babel)
- Using Tailwind Css + custom css + custom scss (sass-loader) + purge css (nuxt-purgecss)
- Using @nuxt/content to handle demo data, which store in **/content** folder
  > - users.json
  > - roles.json
  > - countryCodes.json
- Working with NuxtJs serverMiddleware api, look at in **/server** folder
- Using vuex, look at in **/store** folder
- Using other packages as plugins: vue-select, vue-loading-overlay, vue-js-modal, vee-validate

### Demo Data JSON

Generated by https://www.json-generator.com/

### Functionality

- Having a table list with pagination for **users** and **roles** pages. CRUD flow ready
- Click on a button "Create New User" will open a popup form to create a new user, same thing with "Create New Role"
- Click anywhere on a row will open a popup form to update an item
- Click on a trash on a row icon will delete item that belongs to (with confirmation)
- Create or Update a role will automatically update the select role list in user form, handled by Vuex Store
- Validate all fields in user form by following these rules below, look at in **/plugins/vee-validate.js**:
  > - First name: required
  > - Last name: required
  > - Email: required|email|unique
  > - Country code: mandatory field, must be selected in the country list
  > - Phone number: required|digits:9 (max length)
  > - Role: required (related to the role entity)

### Known limitations

- Having not yet update user roles when updated/deleted a role
- Clicking on the logout link in navigation bar just forward you to the homepage
- Trying reload page once you would like to check the responsive, due to the detection of the device type by @nuxtjs/device
