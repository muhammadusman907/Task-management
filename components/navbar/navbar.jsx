"use client"
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import {sweetAlert} from "../../app/helper/helper"
 function Navbar() {
   const router = useRouter();
  const logOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    sweetAlert({icon : "success" , message : "logout successfully"})
    router.push("/login")
  };
  const userData = JSON.parse(localStorage.getItem("userData") ) ;
  console.log(userData)
  return ( 
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  >
        <Toolbar>
          <Typography variant="h6" component="div" className="cursor-pointer" sx={{ flexGrow: 1 }}>
          {userData?.user_name}
          </Typography>
          <Button color="inherit" onClick={ () => logOut() }>LogOut</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar; 