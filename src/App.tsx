import { memo } from "react";

import Router from "@app/routes/Router";
import { Provider } from "@providers/index";

const App = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  );
};

export default memo(App);
