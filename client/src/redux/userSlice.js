import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

//reducer export krna h so that kahi bhi import maar k data store krwa ske
export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
