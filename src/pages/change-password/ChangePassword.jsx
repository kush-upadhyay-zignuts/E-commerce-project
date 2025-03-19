import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import bcrypt from "bcryptjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/views/ChangePassword.css";
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../constants/validationConstants.js";

const ChangePassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || [];
  // check if there is user or not
  // check current password is correct or not
  // update the new password in localstorage
  //if done successfully then navigate to /home
  const onSubmit = (data) => {
    if (!currentUser) {
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const decryptedPassword = bcrypt.compareSync(
      data.currentpassword,
      currentUser.password
    );
    if (decryptedPassword !== true) {
      toast.error("Incorrect password");
      return;
    }
    const encryptedNewPassword = bcrypt.hashSync(data.newpassword, 10);

    const updatedUser = { ...currentUser, password: encryptedNewPassword };

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    toast.success("password change successfully");
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <>
      <div className="form-main">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-heading">
            <h1>Change Password </h1>
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

          <div className="currentpassword">
            <TextField
              type="password"
              id="currentpassword"
              label="current password"
              variant="outlined"
              {...register("currentpassword", {
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
            {errors.currentpassword && (
              <span>{errors.currentpassword.message}</span>
            )}
          </div>
          <div className="newpassword">
            <TextField
              type="password"
              id="newpassword"
              label="new password"
              variant="outlined"
              {...register("newpassword", {
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
            {errors.newpassword && <span>{errors.newpassword.message}</span>}
          </div>
          <div className="confirmpassword">
            <TextField
              type="password"
              id="confirmpassword"
              label="confirm password"
              variant="outlined"
              {...register("confirmpassword", {
                required: VALIDATION_MESSAGES.REQUIRED,
                validate: (value) =>
                  value === watch("newpassword") ||
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

export default ChangePassword;
