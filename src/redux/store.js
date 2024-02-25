import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import {userSlice} from "./reducer/userSlice";

const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        userSlice: userSlice.reducer,
    },
    middleware:(mid)=>[...mid(), userAPI.middleware],
});

export default store;