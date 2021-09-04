import axios from "axios";
import { extend } from "vee-validate";
import { required, email, digits } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required."
});
extend("email", {
  ...email,
  message: "Email is invalid."
});
extend("digits", {
  ...digits,
  params: ["length"],
  validate(value, { length }) {
    return value.toString().length == length;
  },
  message: "This field must be {length} digit numbers."
});
