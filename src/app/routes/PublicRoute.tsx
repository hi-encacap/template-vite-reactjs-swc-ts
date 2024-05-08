import { Home } from "@features/home";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";

const PublicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default memo(PublicRoute);
