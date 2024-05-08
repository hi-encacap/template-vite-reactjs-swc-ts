import Dashboard from "@features/dashboard/Dashboard";
import { memo } from "react";
import { Route, Routes } from "react-router-dom";

const PrivateRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default memo(PrivateRoute);
