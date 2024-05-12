import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-xl">Welcome to the Home Page.</h1>
      <Button onClick={() => navigate("/application")} className="w-full my-5">
        Take me to Application
      </Button>
    </div>
  );
};

export default Home;
