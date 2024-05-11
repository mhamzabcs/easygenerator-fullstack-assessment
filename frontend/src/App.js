import React, { useState } from "react";
import SignUp from "./components/SignUp.tsx";
import SignIn from "./components/SignIn.tsx";
import Application from "./components/Application.tsx";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignUp = () => {
    setLoggedIn(true);
  };

  const handleSignIn = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn && <SignUp onSignUp={handleSignUp} />}
      {!loggedIn && <SignIn onSignIn={handleSignIn} />}
      {loggedIn && <Application />}
    </div>
  );
};

export default App;
