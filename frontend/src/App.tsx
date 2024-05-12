import React from "react";
import { Routes, Route } from "react-router-dom";
import Application from "./components/Application";
import NonLoggedInOnlyRoutes from "./util/NonLoggedInOnlyRoutes";
import PrivateRoutes from "./util/PrivateRoutes";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="w-full flex h-screen justify-center items-center bg-gray-50">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Application />} path="/application" />
        </Route>
        <Route element={<NonLoggedInOnlyRoutes />}>
          <Route element={<SignUp />} path="/register" />
          <Route element={<SignIn />} path="/login" />
        </Route>
        <Route>
          <Route element={<Home />} path="/" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
