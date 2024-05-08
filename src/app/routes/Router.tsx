import { Error } from "@components/Error";
import { Home } from "@features/home";
import { memo, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Router = () => {
  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: <Home />,
          errorElement: <Error />,
        },
      ]),
    [],
  );

  return <RouterProvider router={router} />;
};

export default memo(Router);
