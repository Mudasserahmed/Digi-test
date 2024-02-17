/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { post } from "@/utils/crudApis";
import Cookies from "js-cookie";

const SignUp = () => {
  const router = useRouter();
  const [SignUpdata, setSignUpData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    age: 0,
    password: "",
  });
  const [loading, setLoading] = useState(true); 
  const [SignUpMessage,setSignUpMessage] = useState("")
  const [SignUpError,setSignUpError] = useState("")
  //handling input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //handle SignUp
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    try {
      const response = await post(
        "https://dummyjson.com/users/add",
        SignUpdata
      );
      if (response) {
        console.log(response);
        setSignUpData({
          userName: "",
          firstName: "",
          lastName: "",
          age: 0,
          password: "",
        });
        setSignUpMessage("User Created")
        setTimeout(()=>{
          router.push("/auth/login")
        },2000)
      }
    } catch (error) {
      console.log(error);
      setSignUpError("error signing up")
    }
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
          style={{ maxWidth: "100%", height: "auto" }}
          height={100}
          alt=""
        />
        <Typography variant="h4" align="center" gutterBottom>
          SignUp
        </Typography>
        <form onSubmit={handleSignUp}>
          <TextField
            name="firstName"
            label="firstName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={SignUpdata?.firstName}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="lastName"
            label="lastName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={SignUpdata?.lastName}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="age"
            label="age"
            variant="outlined"
            fullWidth
            type="number"
            margin="normal"
            value={SignUpdata?.age}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="userName"
            label="userName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={SignUpdata?.userName}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={SignUpdata?.password}
            onChange={(e) => handleChange(e)}
          />
          <Typography>
            already have an Account?{" "}
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => router.push("/auth/login")}
            >
              {" "}
              Login here
            </span>
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
          >
            SignUp
          </Button>
          {SignUpMessage !== "" && (
          <Alert severity="success">{SignUpMessage}</Alert>
        )}
        {SignUpError !== "" && (
          <Alert severity="error">{SignUpError}</Alert>
        )}
        </form>
      </Container>
    </Box>
  );
};

export default SignUp;
