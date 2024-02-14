/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
const SignUp = () => {
  const router = useRouter();
  const [SignUpdata, setSignUpData] = useState({
    email: "",
    userName: "",
    password: "",
  });
  //handling input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //handle login
  const handleLogin = (e:any) => {
    e.preventDefault();
    console.log("signing up with:", SignUpdata);
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
          style={{ maxWidth: "100%", height: "auto" }}
          height={100}
          alt=""
        />
        <Typography variant="h4" align="center" gutterBottom>
          SignUp
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            name="userName"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={SignUpdata?.userName}
            onChange={(e) => handleChange(e)}
          />
          <TextField
            name="email"
            label="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={SignUpdata?.email}
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
            onClick={(e) => handleLogin(e)}
          >
            SignUp
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default SignUp;
