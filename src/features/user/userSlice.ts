import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "./userAPI";
import { RootState } from "../../app/store";

interface UserDataState {
  user: {
    _id: string;
    name: string;
    email: string;
    age: number;
    isCompanyOwner: boolean;
    confirmed: boolean;
    user_roles: any;
    hajaJdida: string;
  };
  token: string;
}
export interface UserState {
  userData: UserDataState;
  status: "pending" | "idle" | "failed";
}

const initialState: UserState = {
  userData: {
    user: {
      _id: "",
      name: "",
      email: "",
      age: -1,
      isCompanyOwner: false,
      confirmed: false,
      user_roles: [],
      hajaJdida: "",
    },
    token: "",
  },
  status: "idle",
};

export const loginAsync = createAsyncThunk(
  "user/loginAsync",
  async (userData: { email: string; password: string }) => {
    const response = await loginService(userData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      loginAsync.fulfilled,
      (state, action: PayloadAction<UserDataState>) => {
        state.status = "idle";
        state.userData = { ...action.payload };
      }
    );
    builder.addCase(loginAsync.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
