import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

function NonLoggedInOnlyRoutes() {
  const token = useAuth();
  return token ? <Navigate to="/application" /> : <Outlet />;
}

export default NonLoggedInOnlyRoutes;
