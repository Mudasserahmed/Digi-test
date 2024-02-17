/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login, loginSuccess } from "@/redux/features/authSlice";
import { AppDispatch } from "@/redux/store";
import { post } from "@/utils/crudApis";
import Cookies from "js-cookie";
// import { useSelector } from 'react-redux';
import ProtectedRoute from "@/components/ProtectedRoute";
const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  // const loginDetails = useSelector((state: any) => state.authReducer);
  const router = useRouter();

  const [logindata, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [loginMessage, setLoginMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true); 

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const payload = {
      username: logindata?.userName,
      password: logindata?.password,
    };
    try {
      const response: any = await post(
        "https://dummyjson.com/auth/login",
        payload
      );
      if (response) {
        console.log(response);
        setLoginData({
          userName: "",
          password: "",
        });
        setLoginMessage("login succesfull");
        dispatch(login(response));
        // cookies().set(response)
        Cookies.set("userData", JSON.stringify(response));
        localStorage.setItem("userData",JSON.stringify(response))
        router.push("/main");
      }
    } catch (error) {
      console.log(error);
      setApiError(error?.response?.data?.message);
    }
    console.log("Logging in with:", logindata);
  };

  useEffect(() => {
    const isLogged = Cookies.get("userData")
    if (isLogged) {
      router.push("/main");
    }
    else {
      setLoading(false); // loading to false when authentication check is complete
    }
  }, [ router]);

  if (loading) {
    return null;
  }
 
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
        {loginMessage !== "" && (
          <Alert severity="success">{loginMessage}</Alert>
        )}
        {apiError !== "" && <Alert severity="error">{apiError}</Alert>}
      </Container>
    </Box>
  );
};

export default LoginForm