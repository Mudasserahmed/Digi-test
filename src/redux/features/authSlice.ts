import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface for the LoginDetails object
interface LoginDetails {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

// AuthState interface for Redux state
interface AuthState {
  isAuth: boolean;
  loginDetails: LoginDetails | null; 
  uid: string;
  isModerator: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  loginDetails: null,
  uid: "",
  isModerator: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState, 
    login: (state, action: PayloadAction<LoginDetails>) => {
      return {
        ...state,
        isAuth: true,
        loginDetails: action.payload,
        uid: "ushdanjn1nji2ni3",
        isModerator: false,
      };
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
