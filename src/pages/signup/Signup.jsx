import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import bcrypt from "bcryptjs";

import "./Signup.css"

const Signup = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const onSubmit = (data)=>{
        let users = JSON.parse(localStorage.getItem("users")) || [];
        if(users.some((user)=> (user.email === data.email))){
            alert("email is alredy existed")
            return;
        }

        const encryptedPassword = bcrypt.hashSync(data.password,10)
        console.log(encryptedPassword)

        const newUser = {
            firstname : data.firstname ,
            lastname :  data.lastname ,
            email :  data.email ,
            mobile :  data.mobile ,
            password :  encryptedPassword ,
        }

        users.push(newUser)
        localStorage.setItem("users",JSON.stringify(users))

        alert("sign up is done successfully")
        navigate("/login")

    }
  
  return (
    <>
    
    <div className='form-main'>
    <form className='form' onSubmit={handleSubmit(onSubmit)}>
    <div className='form-heading'>
             <h1>Sign Up</h1>

        </div>
        <div className="firstname">
          <TextField id="firstname" label="firstname" variant="outlined"  {...register("firstname" , { required: true })} />
          <br />
          {errors.firstname&& <span>{errors.firstname.message }</span>}
        </div>
        <div className="lastname">
           
            <TextField id="lastname" label="lastname" variant="outlined"  {...register("lastname", { required: true })} />
            <br />
            {errors.lastname && <span>{errors.lastname.message }</span>}
        </div>
        <div className="email">
           
            <TextField id="email" label="email" variant="outlined" {...register("email", { required: true ,  pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
             message: "Enter a valid email address",
             } })} />
            <br />
            {errors.email && <span>{errors.email.message }</span>}
        </div>
        <div className="mobile">
           
            <TextField id="mobile" label="mobile" variant="outlined"  {...register("mobile", { required: true , pattern : {value :/^(0|91)?[6-9][0-9]{9}$/ , message : "Enter a valid mobile number"} })} />
            <br />
            {errors.mobile && <span>{errors.mobile.message }</span>}
        </div>
        <div className="password">
          
            <TextField  type='password' id="password" label="password" variant="outlined" {...register("password", { required: true , minLength :8 ,maxLength :32 , pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
                message: "Password must be 8-32 chars, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
                 } })} />
            <br />
            {errors.password && <span>{errors.password.message }</span>}
        </div>
        <div className="confirmpassword">
            
            <TextField type='password'  id="confirmpassword" label="confirmpassword" variant="outlined" {...register("confirmpassword", { required: true , minLength :8 ,maxLength :32 ,validate : value => value === watch("password") || "passwords do not match" })} />
            <br />
            {errors.confirmpassword && <span>{errors.confirmpassword.message }</span>}
        </div>
      
   
      
      <input id='submit' type="submit" />
    </form>

     
    </div>
    </>
  )
}

export default Signup
