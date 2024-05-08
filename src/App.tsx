import { memo } from "react";

import Router from "@app/routes/Route";
import { Provider } from "@providers/index";

const App = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  );
};

export default memo(App);
