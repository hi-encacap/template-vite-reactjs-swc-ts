import { memo } from "react";
import { FormattedMessage } from "react-intl";

import { Provider } from "@/components/Provider";

const UMApp = () => {
  return (
    <Provider>
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div>
          <FormattedMessage id="app.hello_from_name_em" values={{ name: "Encacap" }} />
        </div>
      </div>
    </Provider>
  );
};

const App = memo(UMApp);

export default App;
