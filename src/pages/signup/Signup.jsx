import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import bcrypt from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/views/Signup.css";
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../constants/validationConstants.js";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  //check if the user is already register or not
  //encrypt the new user password
  //set the new user to the localstorage
  //if successfull signup then navigate to /home
  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === data.email)) {
      toast.error("Email is already existed");
      return;
    }

    const encryptedPassword = bcrypt.hashSync(data.password, 10);
    console.log(encryptedPassword);

    const newUser = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      mobile: data.mobile,
      password: encryptedPassword,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("sign up is done successfully");
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <>
      <div className="form-main">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-heading">
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
            <h1>Sign Up</h1>
          </div>
          <div className="firstname">
            <TextField
              id="firstname"
              label="firstname"
              variant="outlined"
              {...register("firstname", {
                required: VALIDATION_MESSAGES.REQUIRED,
                minLength: {
                  value: 2,
                  message: VALIDATION_MESSAGES.FIRSTNAME.MIN,
                },
                maxLength: {
                  value: 30,
                  message: VALIDATION_MESSAGES.FIRSTNAME.MAX,
                },
                pattern: {
                  value: VALIDATION_PATTERNS.NAME,
                  message: VALIDATION_MESSAGES.FIRSTNAME.INVALID,
                },
              })}
            />
            <br />
            {errors.firstname && <span>{errors.firstname.message}</span>}
          </div>
          <div className="lastname">
            <TextField
              id="lastname"
              label="lastname"
              variant="outlined"
              {...register("lastname", {
                required: VALIDATION_MESSAGES.REQUIRED,
                minLength: {
                  value: 2,
                  message: VALIDATION_MESSAGES.LASTNAME.MIN,
                },
                maxLength: {
                  value: 30,
                  message: VALIDATION_MESSAGES.LASTNAME.MAX,
                },
                pattern: {
                  value: VALIDATION_PATTERNS.NAME,
                  message: VALIDATION_MESSAGES.LASTNAME.INVALID,
                },
              })}
            />
            <br />
            {errors.lastname && <span>{errors.lastname.message}</span>}
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
          <div className="mobile">
            <TextField
              id="mobile"
              label="mobile"
              variant="outlined"
              {...register("mobile", {
                required: VALIDATION_MESSAGES.REQUIRED,
                pattern: {
                  value: VALIDATION_PATTERNS.MOBILE,
                  message: VALIDATION_MESSAGES.MOBILE.INVALID,
                },
              })}
            />
            <br />
            {errors.mobile && <span>{errors.mobile.message}</span>}
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
          <div className="confirmpassword">
            <TextField
              type="password"
              id="confirmpassword"
              label="confirmpassword"
              variant="outlined"
              {...register("confirmpassword", {
                required: VALIDATION_MESSAGES.REQUIRED,
                validate: (value) =>
                  value === watch("password") ||
                  VALIDATION_MESSAGES.CONFIRM_PASSWORD,
              })}
            />
            <br />
            {errors.confirmpassword && (
              <span>{errors.confirmpassword.message}</span>
            )}
          </div>

          <input id="submit" type="submit" />
          <ToastContainer position="top-right" autoClose={3000} />
        </form>
      </div>
    </>
  );
};

export default Signup;
