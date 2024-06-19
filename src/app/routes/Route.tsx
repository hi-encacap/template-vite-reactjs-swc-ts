import { userSelector } from "@app/selectors/common";
import { Error } from "@components/Error";
import useSelector from "@hooks/useSelector";
import { memo, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

  return <RouterProvider router={router} />;
};

export default memo(Router);
