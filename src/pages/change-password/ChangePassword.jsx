import React from 'react'

import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import bcrypt from "bcryptjs";

import "./ChangePassword.css"

const ChangePassword = () => {
  const navigate = useNavigate()
 const { register, handleSubmit, watch, formState: { errors } } = useForm();
 const currentUser = JSON.parse(localStorage.getItem("loggedInUser")) || [];

 const onSubmit = (data)=>{
  if(!currentUser){
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const decryptedPassword = bcrypt.compareSync(data.currentpassword,currentUser.password)
  if(decryptedPassword !== true){
    console.log("hshshshs ")
    alert("Incorrect password")
    return ;

 }
  const encryptedNewPassword = bcrypt.hashSync(data.newpassword,10)
  

  const updatedUser = {...currentUser, password: encryptedNewPassword}

  const updatedUsers = users.map( user => user.email === currentUser.email ? updatedUser : user )

  localStorage.setItem("users",JSON.stringify(updatedUsers))
  localStorage.setItem("loggedInUser",JSON.stringify(updatedUser))
  alert("password change successfully")
  navigate("/home")

}

     return (
       <>
       
       <div className='form-main'>
       <form className='form' onSubmit={handleSubmit(onSubmit)}>
       <div className='form-heading'>
                <h1>Change Password </h1>
   
           </div>
          
           <div className="currentpassword">
                     
                       <TextField  type='password' id="currentpassword" label="current password" variant="outlined" {...register("currentpassword", { required: true , minLength :8 ,maxLength :32 , pattern: {
                           value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                           message: "Password must be 8-32 chars, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
                            } })} />
                       <br />
                       {errors.currentpassword && <span>{errors.currentpassword.message }</span>}
                   </div>
           <div className="newpassword">
             
           <TextField  type='password' id="newpassword" label="new password" variant="outlined" {...register("newpassword", { required: true , minLength :8 ,maxLength :32 , pattern: {
                           value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                           message: "Password must be 8-32 chars, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
                            } })} />
                       <br />
                       {errors.newpassword && <span>{errors.newpassword.message }</span>}
           </div>
           <div className="confirmpassword">
             
           <TextField  type='password' id="confirmpassword" label="confirm password" variant="outlined" {...register("confirmpassword", { required: true , minLength :8 ,maxLength :32 ,validate : value => value === watch("newpassword") || "passwords do not match", pattern: {
                           value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                           message: "Password must be 8-32 chars, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character",

                            } })} />
                       <br />
                       {errors.confirmpassword && <span>{errors.confirmpassword.message }</span>}
           </div>
          
         
      
         
         <input id='submit' type="submit" />
       </form>
   
        
       </div>
       </>
     )
   }

export default ChangePassword
