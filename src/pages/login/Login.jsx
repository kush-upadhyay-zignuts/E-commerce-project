import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import bcrypt from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/views/Login.css";
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../constants/validationConstants.js";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  //check the user is registered or not
  //compare the password enter with the password stored in local storage
  //if password is correct then set the user as loggedIn user
  //if successful login then navigate to /home
  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((user) => user.email === data.email);
    if (!user) {
      toast.error("Email not found");
      return;
    }

    const decryptedPassword = bcrypt.compareSync(data.password, user.password);

    if (decryptedPassword !== true) {
      toast.error("Incorrect password");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    toast.success("Login successful!");
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <>
      <div className="form-main">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-heading">
            <h1>Sign In </h1>
            <IconButton
              size="larger"
              color="inherit"
              onClick={() => {
                navigate("/home");
              }}
              sx={{ position: "absolute", left: "0", top: "0" }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <div className="email">
            <TextField
              id="email"
              label="email"
              variant="outlined"
              {...register("email", {
                required: VALIDATION_MESSAGES.REQUIRED,
                pattern: {
                  value: VALIDATION_PATTERNS.EMAIL,
                  message: VALIDATION_MESSAGES.EMAIL.INVALID,
                },
              })}
            />
            <br />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="password">
            <TextField
              type="password"
              id="password"
              label="password"
              variant="outlined"
              {...register("password", {
                required: VALIDATION_MESSAGES.REQUIRED,
                minLength: {
                  value: 8,
                  message: VALIDATION_MESSAGES.PASSWORD.MIN,
                },
                maxLength: {
                  value: 32,
                  message: VALIDATION_MESSAGES.PASSWORD.MAX,
                },
                pattern: {
                  value: VALIDATION_PATTERNS.PASSWORD,
                  message: VALIDATION_MESSAGES.PASSWORD.INVALID,
                },
              })}
            />
            <br />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <input id="submit" type="submit" />
          <ToastContainer position="top-right" autoClose={3000} />
        </form>
      </div>
    </>
  );
};

export default Login;
