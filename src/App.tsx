import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { memo } from "react";

import Router from "@app/routes/Route";
import { Provider } from "@providers/index";

dayjs.extend(isBetween);

const App = () => {
  return (
    <Provider>
      <Router />
    </Provider>
  );
};

export default memo(App);
