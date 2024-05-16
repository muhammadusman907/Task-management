// pages/Register.js
"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {sweetAlert} from '@/app/helper/helper'
import Loader from '@/components/loader/loader';
import {registerUser} from "./page" ;
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  email: string;
  password: string;
  user_name : string
};
const defaultTheme = createTheme();
function Register() {
  const [loading , setLoading] = useState (false) ;
  const router = useRouter();
   const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const addData : SubmitHandler<Inputs> = async (data) => {
    const email : string = data.email ;
    const password : string  = data.password ;
    const user_name : string  = data.user_name ;
    const userData = {
      email ,
      password ,
      user_name  ,
    };
     setLoading(true);
    try { 

  const registerUserData = await registerUser(userData) ;
  localStorage.setItem("token", registerUserData?.data?.token);
  localStorage.setItem("userData", JSON.stringify(registerUserData?.data?.users));
  console.log(registerUserData?.data)
  setLoading(false);
  sweetAlert({ message: "regiter Succesfully", icon: "success", button: false });
  router.push("/", { scroll: false });
      console.log(registerUserData);
    } catch (error) {
     sweetAlert({ message: error?.response?.data?.err, icon: "error", button : true });
      console.log(error);
        setLoading(false);

    }
  };
  React.useEffect(()=>{  
    if(localStorage.getItem("token")){
        router.push("/", { scroll: false });
    }
  },[])
  return (
    <>  
  {loading && <Loader />}

   <div className="flex justify-center  w-full h-[100vh] ">
        <form
          onSubmit={handleSubmit(addData)}
          className="flex flex-col container xs:w-[80%] sm:w-[70%] md:w-[50%] lg:w-[33%] m-auto 
           justify-center m-auto border-2 p-16 box-shadow rounded-md"
        > 
        <h1 className="text-[1.5rem] text-center"> Welocome Task Manage App</h1>
         <TextField
            margin="normal"
            required
            fullWidth
            label="User Name"
            type="text"
            {...register("user_name", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email", { required: true })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password", { required: true })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {" "}
            Sign In
          </Button>
          <Link href="/login">{"already have account?"}</Link>
        </form>
      </div>
  </>

  
  );
}

export default Register;
   