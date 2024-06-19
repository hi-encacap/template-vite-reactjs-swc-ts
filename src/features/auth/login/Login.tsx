import { yupResolver } from "@hookform/resolvers/yup";
import { HttpStatusCode, isAxiosError } from "axios";
import { clone, omit, set, unset } from "lodash";
import { memo, useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useIntl } from "react-intl";

import { MANAGER_PATH } from "@constants/path";
import useDocumentTitle from "@hooks/useDocumentTitle";
import useToast from "@hooks/useToast";
import { ILoginFormData } from "@interfaces/auth";
import { authService } from "@services/index";

import ContainerRight from "../components/ContainerRight";
import { loginFormSchema } from "../schema";

import { isValidPhone } from "@utils/schema";
import Form from "./components/Form";
import SSO from "./components/SSO";

const Login = () => {
  const { formatMessage } = useIntl();
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit: useFormSubmit,
    setError,
    ...formProps
  } = useForm<ILoginFormData>({
    resolver: yupResolver(loginFormSchema(formatMessage)),
  });

  const handleLogin = useCallback(
    async (data: ILoginFormData) => {
      setIsSubmitting(true);

      try {
        const submitData = clone(data);

        if (isValidPhone(submitData.email)) {
          set(submitData, "phone", submitData.email);
          unset(submitData, "email");
        } else {
          unset(submitData, "phone");
        }

        await authService.login(omit(submitData, "remember"));

        window.location.href = MANAGER_PATH.DASHBOARD;
      } catch (error) {
        if (isAxiosError(error) && error.response) {
          const { status } = error.response;

          if (status === HttpStatusCode.Unauthorized) {
            toast.error(formatMessage({ id: "login_credentials_invalid" }));
            setIsSubmitting(false);
            return;
          }
        }

        toast.error(formatMessage({ id: "login_error" }));
        setIsSubmitting(false);
      }
    },
    [toast, formatMessage],
  );

  useDocumentTitle(formatMessage({ id: "login" }));

  return (
    <ContainerRight
      subtitle={formatMessage({ id: "login_welcome_back_d" })}
      title={formatMessage({ id: "login_to_your_account" })}
    >
      <FormProvider control={control} handleSubmit={useFormSubmit} setError={setError} {...formProps}>
        <Form isLoading={isSubmitting} onLogin={handleLogin} />
        {import.meta.env.VITE_APP_ENV === "development" && <SSO />}
      </FormProvider>
    </ContainerRight>
  );
};

export default memo(Login);
