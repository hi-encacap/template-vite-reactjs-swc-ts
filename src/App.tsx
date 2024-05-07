import { memo } from "react";

import { Home } from "@features/home";
import { Provider } from "@providers/index";

const App = () => {
  return (
    <Provider>
      <Home />
    </Provider>
  );
};

export default memo(App);
