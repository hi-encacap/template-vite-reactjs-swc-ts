import { memo } from "react";

import { Provider } from "@/components/Provider";
import { Home } from "@features/home";

const UMApp = () => {
  return (
    <Provider>
      <Home />
    </Provider>
  );
};

const App = memo(UMApp);

export default App;
