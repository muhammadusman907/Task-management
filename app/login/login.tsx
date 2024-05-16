// pages/login.js
"use client";
import React, { useState, useEffect,useContext , createContext} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from '../../components/loader/loader';
import {sweetAlert} from '@/app/helper/helper'
import {loginUser} from "./page" ;
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  email  : string ;
  password : string
};
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function Login() {
 const {
   register,
   handleSubmit,
   watch,
   reset ,
   formState: { errors },
 } = useForm<Inputs>();
   const [loading , setLoading] = useState (false) ;

  const addData : SubmitHandler<Inputs> = async (data) => {
    
    const emailValue : string = data?.email ;
    const passwordValue : string = data?.password 
    const userData: { email: string ; password: string } = {
      email: emailValue,
      password: passwordValue,
    };
    console.log(userData);
    setLoading(true);
    try {
      const loginUserData : {data : { token : string , findUser : {}} } = await loginUser(userData);
      localStorage.setItem("token", loginUserData?.data?.token);
      localStorage.setItem(
        "userData",
        JSON.stringify(loginUserData?.data?.findUser)
      );
      setLoading(false);
      sweetAlert({
        message: "login Succesfully",
        icon: "success",
        button: false,
      });

      router.push("/", { scroll: false });
      console.log(loginUserData);
    } catch (error) {
      sweetAlert({
        message: error?.response?.data?.message,
        icon: "error",
        button: true,
      });
      setLoading(false);

      console.log(error);
    }
  };
  const router = useRouter();

   React.useEffect(()=>{  
    if(localStorage.getItem("token")){
        router.push("/", { scroll: false });
    }
  },[])
  return (
    <>
      {loading && <Loader />}

          <form onSubmit={handleSubmit(addData)} className="flex flex-col container w-[40%] m-auto h-[100vh] justify-center" >
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
                >   Sign In
                </Button>
                <Link href="/register">
                      {"Don't have an account? Sign Up"}
                    </Link>
              </form>
          {/* <CssBaseline /> */}
            {/* <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
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
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href="/register">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box> */}
       

        
    </>
  );
}
export default Login;
