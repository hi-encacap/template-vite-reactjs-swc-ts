import { FormatMessage } from "@interfaces/common";
import { isValidPhone } from "@utils/schema";
import { object, string } from "yup";

const loginFormSchema = (t: FormatMessage) =>
  object().shape({
    email: string()
      .required(t({ id: "please_enter_this_field_d" }))
      .test({
        name: "isValidEmailOrPhone",
        test: (value) => {
          if (!value) return true;

          return isValidPhone(value) || string().email().isValidSync(value);
        },
        message: t({ id: "email_or_phone_invalid_d" }),
      }),
    password: string().required(t({ id: "please_enter_this_field_d" })),
  });

export { loginFormSchema };
