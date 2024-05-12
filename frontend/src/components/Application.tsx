import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-xl">Welcome to the application Page.</h1>
      <Button onClick={handleLogout} className="w-full my-5">
        Logout
      </Button>
    </div>
  );
};

export default Application;
