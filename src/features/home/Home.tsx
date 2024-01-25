import { memo, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { axios } from "@utils/index";

const UMHome = () => {
  const intl = useIntl();

  const handleClick = useCallback(async () => {
    await axios.get("ping", { timeout: 100 });
  }, []);

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
