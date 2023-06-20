import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  const handleRegisterClick = () => {
    navigate("/register"); // Use navigate to go to the "/register" route
  };

  return (
    <div className="container-1" >
      <form className="form" onSubmit={handleSubmit}>
        <label className="text">
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label className="text">
          Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        {isServerError ? (
          <p className="error">Login failed, incorrect credentials!</p>
        ) : null}
      <div>
        <p className="register-link" onClick={handleRegisterClick}>Click to register</p>
      </div>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
