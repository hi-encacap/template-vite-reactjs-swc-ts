import { memo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";

import { ILoginFormData } from "@interfaces/auth";

import SSOButton from "./SSOButton";

const LoginSSO = () => {
  const { formatMessage } = useIntl();
  const { setValue } = useFormContext<ILoginFormData>();

  const handleClickLoginAsAdmin = useCallback(() => {
    setValue("email", "admin@gmail.com");
    setValue("password", "admin@123");
  }, [setValue]);

  const handleClickLoginAsUser = useCallback(() => {
    setValue("email", "user@gmail.com");
    setValue("password", "user@123");
  }, [setValue]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="relative flex items-center justify-center">
        <div className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-100 bg-white text-xs">
          OR
        </div>
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-gray-100" />
      </div>
      <div className="grid grid-cols-2 gap-x-6">
        <SSOButton onClick={handleClickLoginAsAdmin}>{formatMessage({ id: "login_as_admin" })}</SSOButton>
        <SSOButton onClick={handleClickLoginAsUser}>{formatMessage({ id: "login_as_user" })}</SSOButton>
      </div>
    </div>
  );
};

export default memo(LoginSSO);
