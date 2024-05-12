import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      if (!email || !password || !fullname) {
        setError("Please fill in all fields.");
        return;
      }
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        setError(
          "Password must be at least 8 characters long, contain at least one letter, one number, and one special character."
        );
        return;
      }
      setLoading(true);
      const url = process.env.REACT_APP_SERVER_URL + "/user";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, fullname }),
      });
      if (!response.ok) {
        if (response.status === 400) {
          const responseJSON = await response.json();
          throw new Error(responseJSON?.message[0]);
        } else {
          throw new Error("Something went wrong please try again later!");
        }
      }
      setError("");
      const responseJSON = await response.json();
      localStorage.setItem("token", responseJSON.token);
      navigate("/application");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create your account now!
          </h1>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <TextInput
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <TextInput
              type="text"
              name="fullname"
              id="fullname"
              placeholder="name here"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <TextInput
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Button
              size="xl"
              isProcessing={loading}
              disabled={loading}
              processingSpinner={
                <AiOutlineLoading className="h-6 w-6 animate-spin" />
              }
              color="blue"
              className="w-full"
              onClick={handleSignUp}
            >
              {loading ? "Signing up..." : "Sign Up!"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
