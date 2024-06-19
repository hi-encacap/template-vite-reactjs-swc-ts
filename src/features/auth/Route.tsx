import { memo } from "react";
import { Route, Routes } from "react-router-dom";

import AuthContainerLeft from "./components/ContainerLeft";
import { Login } from "./login";

const AuthRoute = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="grid w-screen-lg grid-cols-2 overflow-hidden rounded-lg bg-white shadow-centered">
        <AuthContainerLeft />
        <div>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default memo(AuthRoute);
