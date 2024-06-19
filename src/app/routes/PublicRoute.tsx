import { AuthRoute } from "@features/auth";
import { Home } from "@features/home";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth/*" element={<AuthRoute />} />
    </Routes>
  );
};

export default memo(PublicRoute);
