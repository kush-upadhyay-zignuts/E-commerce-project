import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { IconButton, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/views/EditProfile.css";
import {
  VALIDATION_MESSAGES,
  VALIDATION_PATTERNS,
} from "../../constants/validationConstants.js";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [edit,setEdit] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || [];
  //setting the currentuser value as default to the textfield
  setValue("firstname", currentUser.firstname);
  setValue("lastname", currentUser.lastname);
  setValue("email", currentUser.email);
  setValue("mobile", currentUser.mobile);
  setValue("firstname", currentUser.firstname);

    // check if email is already existed
  // update the details in localstorage
  //if done successfully then navigate to /home
  const onSubmit = (data) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some(
      (user) => user.email === data.email && user.email !== currentUser.email
    );
    if (emailExists) {
      toast.error("email is already in use");
      return; 
    }

    const updatedUser = { ...currentUser, ...data };

    const updatedUsers = users.map((user) =>
      user.email === currentUser.email ? updatedUser : user
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    toast.success("profile updated successfully");
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <>
      <div className="form-main">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-heading">
            <h1>Profile </h1>
            <IconButton
              size="larger"
              color="inherit"
              onClick={()=>{ navigate("/home")}}
              sx={{position:"absolute",left:"0", top:"0"}}
             
            >
             <CloseIcon />
            </IconButton>
          </div>

          <div className="firstname">
            <TextField
              id="firstname"
              label="firstname"
              variant="outlined"
             disabled = {edit}
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
              disabled = {edit}
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
              disabled = {edit}
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
              disabled = {edit}
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

         {!edit && <input id="submit" type="submit" /> }
           {edit && <Button sx={{height: "5vh",width: "10vw",backgroundColor : "#ecf0f1",border:"2px solid black",color:"black",borderRadius:"0.5rem"}} variant="outlined"
            onClick={()=>{setEdit((prev)=>(!prev))}}>edit</Button>}
          <ToastContainer position="top-right" autoClose={3000} />
        </form>
      </div>
    </>
  );
};

export default EditProfile;
