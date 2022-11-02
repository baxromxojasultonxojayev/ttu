import { createSlice } from "@reduxjs/toolkit";
console.log(
  'localStorage.getItem("isLogged")',
  localStorage.getItem("isLogged")
);
export const { actions: authActions, reducer: authReducer } = createSlice({
  name: "auth",
  initialState: {
    isAuth: localStorage.getItem("isLogged") || null,
  },
  reducers: {
    login: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      state.isAuth = false;
      localStorage.removeItem("isLogged");
      localStorage.removeItem("permissions");
    },
  },
});
