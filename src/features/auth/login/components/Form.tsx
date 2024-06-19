import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Button } from "@components/Button";
import { Checkbox, Input } from "@components/Form";
import { ILoginFormData } from "@interfaces/auth";

interface LoginFormProps {
  isLoading: boolean;
  onLogin: (credentials: ILoginFormData) => void;
}

const LoginForm = ({ isLoading, onLogin }: LoginFormProps) => {
  const { formatMessage } = useIntl();

  const { control, handleSubmit: useFormSubmit } = useFormContext<ILoginFormData>();

  const handleSubmit = useFormSubmit(onLogin);

  return (
    <form
      className={twMerge(
        "flex flex-col space-y-5 pt-9",
        import.meta.env.VITE_APP_ENV === "development" && "pb-8",
      )}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-6">
          <Input
            control={control}
            disabled={isLoading}
            label={formatMessage({ id: "email_or_phone" })}
            name="email"
          />
          <Input
            control={control}
            disabled={isLoading}
            label={formatMessage({ id: "password" })}
            name="password"
            type="password"
          />
        </div>
        <Checkbox
          control={control}
          label={formatMessage({ id: "remember_my_preferences" })}
          labelClassName="font-semibold pb-0.5"
          name="remember"
        />
      </div>
      <Button htmlType="submit" loading={isLoading} type="primary">
        {formatMessage({ id: "login" })}
      </Button>
    </form>
  );
};

export default memo(LoginForm);
