import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, taskReducer } from "./reducer/userReducer";
const store1 = configureStore({
    reducer: {
        login: loginReducer,
        task: taskReducer,
    },
});
export const server = "https://tms-45m0.onrender.com";
export default store1;