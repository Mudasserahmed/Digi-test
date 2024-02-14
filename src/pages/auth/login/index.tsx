/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state:any)=>state.authReducer.value)
  console.log("user Details",user)
  const router = useRouter();
  const [logindata, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e:any) => {
    e.preventDefault()
    console.log("Logging in with:",logindata);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <img
          src="https://media.licdn.com/dms/image/C4D1BAQExWvGwL1YTXA/company-background_10000/0/1645561309287/digipops_cover?e=2147483647&v=beta&t=bKLHBJ3uUP5ZTOhF_LiOKPU5o7zAGDnjaFs60Pn8uHo"
          width={530}
          height={100}
          style={{ maxWidth: "100%", height: "auto" }}
          alt=""
        />
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            name="userName"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={logindata?.userName}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={logindata?.password}
            onChange={(e) => handleChange(e)}
          />
          <Typography>
            Don't have an Account?{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => router.push("/auth/signup")}
            >
              {" "}
              SignUp here
            </span>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default LoginForm;
