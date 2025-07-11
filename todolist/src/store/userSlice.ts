// store/userSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: "",
  email: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, name, email, token } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.token = token;
    },
    clearUser(state) {
      state.id = null;
      state.name = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
