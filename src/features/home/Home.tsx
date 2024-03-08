import { memo, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import useToast from "@hooks/useToast";

const UMHome = () => {
  const intl = useIntl();
  const toast = useToast();

  const handleClick = useCallback(() => {
    toast.success(
      intl.formatMessage({ id: "app.hello_from_name_em" }, { name: "Encacap" }),
      "This is the toast message. Can too long :))",
    );
    toast.error("Or only have the title only. It will be the same as the message");
    toast.warning(
      intl.formatMessage({ id: "app.hello_from_name_em" }, { name: "Encacap" }),
      "This is the toast message. Can too long :))",
    );
    toast.info("Or only have the title only. It will be the same as the message");
  }, [intl, toast]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
      <div>
        <FormattedMessage id="app.hello_from_name_em" values={{ name: "Encacap" }} />
      </div>
      <button className="text-sm" type="button" onClick={handleClick}>
        {intl.formatMessage({ id: "app.click_me_em" })}
      </button>
    </div>
  );
};

const Home = memo(UMHome);

export default Home;
