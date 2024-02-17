/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */
"use client"
import ProtectedRoute from "@/components/ProtectedRoute";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Main = () => {
  const router = useRouter();
  const isAuth = Cookies?.get("userData");
//   console.log("Login user ",JSON?.parse(isAuth))
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    const isLogged = Cookies.get("userData")
    if (!isLogged) {
      router.push('/auth/login');
    } else {
      setLoading(false); // Set loading to false when authentication check is complete
    }
  }, [])

  // Render nothing if loading is true
  if (loading) {
    return null;
  }
 const handleLogout = ()=>{
    Cookies.remove("userData")
    router.reload()
 }
  return (
    <>
      {/* <Typography>Signed in With</Typography> */}
      <Button onClick={()=>handleLogout()} variant="contained">Logout</Button>
      <Box
        display="flex"
        justifyContent="center"
        // alignItems="center"
        minHeight="100vh"
      >
        <Container maxWidth="sm" sx={{ textAlign: "center" }}> 
        <Typography variant="h2">To-Do-App</Typography>
          <TextField
            name="todo"
            label="todo"
            variant="outlined"
            fullWidth
            margin="normal"
            type="todo"
          />
          <Button variant="outlined">Add Todo</Button>
        </Container>
      </Box>
    </>
  );
};

export default Main;
