import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/theme";
export default function Index() {
  const router = useRouter();
  useEffect(() => {
     router.replace("/auth/login");
  }, []);

  return (
    <>
    <ThemeProvider theme={theme}>
      <div />
      </ThemeProvider>
    </>
  );
}