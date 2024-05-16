// pages/Register.js
"use client";
import React, { useState, useEffect, useContext, createContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import {sweetAlert} from '@/app/helper/helper'
import Loader from '@/components/loader/loader';
import {registerUser} from "./page"
const defaultTheme = createTheme();
function Register() {
  const [loading , setLoading] = useState (false) ;
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
      user_name: data.get("user_name"),
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
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
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
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user_name"
              label="Your Name"
              name="user_name"
              autoComplete="user_name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/pages/login">
                  {"already have account"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider></>
  
  );
}

export default Register;
