// store hota h and slices hote h (eg user slice) wo store mein jayega
// hooks use hote h like useSelector to get all data of slice useDispatch for updation purposes
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
//jo default mein export hua h

export const store = configureStore({
  reducer: {
    user: userSlice, //userSlice.reducer
  },
  devTools: true,
});
