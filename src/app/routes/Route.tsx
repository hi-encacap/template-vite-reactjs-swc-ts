import { memo, useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { userSelector } from "@app/selectors/common";
import { Error } from "@components/Error";
import { EllipseGreenLine, EllipseRedLine } from "@components/Icon";
import useSelector from "@hooks/useSelector";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Router = () => {
  const user = useSelector(userSelector);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/*",
          element: user ? <PrivateRoute /> : <PublicRoute />,
          errorElement: <Error />,
        },
      ]),
    [user],
  );

  return (
    <div className="relative bg-gray-100">
      <div className="relative z-10">
        <RouterProvider router={router} />
      </div>
      <div className="absolute inset-0 z-0">
        <EllipseGreenLine className="absolute right-0 top-0 opacity-20" />
        <EllipseRedLine className="absolute bottom-0 left-0 -scale-x-100 opacity-15" />
      </div>
    </div>
  );
};

export default memo(Router);
