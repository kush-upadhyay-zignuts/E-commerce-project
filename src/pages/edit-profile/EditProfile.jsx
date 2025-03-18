import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./EditProfile.css";


const EditProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || [];

  setValue("firstname", currentUser.firstname);
  setValue("lastname", currentUser.lastname);
  setValue("email", currentUser.email);
  setValue("mobile", currentUser.mobile);
  setValue("firstname", currentUser.firstname);

  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some(
      (user) => user.email === data.email && user.email !== currentUser.email
    );
    if (emailExists) {
      alert("email is already in use");
      return;
    }

    const updatedUser = { ...currentUser, ...data };

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    alert("profile updated successfully");
    navigate("/home");
  };

  return (
    <>
      <div className="form-main">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-heading">
            <h1>Edit Your Profile </h1>
          </div>

          <div className="firstname">
            <TextField
              id="firstname"
              label="firstname"
              variant="outlined"
              {...register("firstname", { required: true })}
            />
            <br />
            {errors.firstname && <span>{errors.firstname.message}</span>}
          </div>
          <div className="lastname">
            <TextField
              id="lastname"
              label="lastname"
              variant="outlined"
              {...register("lastname", { required: true })}
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
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
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
                required: true,
                pattern: {
                  value: /^(0|91)?[6-9][0-9]{9}$/,
                  message: "Enter a valid mobile number",
                },
              })}
            />
            <br />
            {errors.mobile && <span>{errors.mobile.message}</span>}
          </div>

          <input id="submit" type="submit" />
        </form>
      </div>
    </>
  );
};

export default EditProfile;
