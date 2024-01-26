import { memo } from "react";

import { Home } from "@features/home";
import { Provider } from "@providers/index";

const UMApp = () => {
  return (
    <Provider>
      <Home />
    </Provider>
  );
};

const App = memo(UMApp);

export default App;
