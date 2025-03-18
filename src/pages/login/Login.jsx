import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import bcrypt from "bcryptjs";

import "./Login.css"

const Login = () => {
 const { register, handleSubmit, watch, formState: { errors } } = useForm();
 const navigate = useNavigate()
      const onSubmit = (data)=>{
             let users = JSON.parse(localStorage.getItem("users")) || [];

             const user = users.find((user)=>(user.email === data.email))
             if(!user){
                 alert("Email not found")
                 return;
             }
     
             const decryptedPassword = bcrypt.compareSync(data.password,user.password)
          

             if(decryptedPassword !== true){
                alert("Incorrect password")
                return ;

             }

             localStorage.setItem("loggedInUser",JSON.stringify(user))
     
             alert("Login successfully")
             navigate("/home")
     
         }
   
   return (
     <>
     
     <div className='form-main'>
     <form className='form' onSubmit={handleSubmit(onSubmit)}>
     <div className='form-heading'>
              <h1>Sign In   </h1>
 
         </div>
        
        <div className="email">
                   
                    <TextField id="email" label="email" variant="outlined" {...register("email", { required: true ,  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                     message: "Enter a valid email address",
                     } })} />
                    <br />
                    {errors.email && <span>{errors.email.message }</span>}
                </div>
                <div className="password">
                  
                    <TextField  type='password' id="password" label="password" variant="outlined" {...register("password", { required: true , minLength :8 ,maxLength :32 , pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                        message: "Password must be 8-32 chars, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
                         } })} />
                    <br />
                    {errors.password && <span>{errors.password.message }</span>}
                </div>
        
       
    
       
       <input id='submit' type="submit" />
     </form>
 
      
     </div>
     </>
   )
 }

export default Login
