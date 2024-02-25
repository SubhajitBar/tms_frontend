// import axios from "axios";
// import { server } from "../store";

// export const login = (email, password) => async (dispatch) => {
//     try {
//         dispatch({ type: "loginRequest" });
//         const { data } = await axios.post(`${server}/api/v1/login`, { email, password }, {
//             headers: {
//                 "Content-Type": "application/json"
//             }, withCredentials: true,
//         });

//         dispatch({ type: "loginSuccess", payload: data.message });

//     } catch (error) {
//         dispatch({ type: "loginFail", payload: error.response.data.message });

//     }
// };



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const backend_server = "https://tms-45m0.onrender.com"

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${backend_server}/api/v1/` }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (user) => ({
                url: "login",
                method: "POST",
                body: user,
            })
        }),
        loadUser: builder.query({
            url:"me",
            method: "GET",   
        })
    }),
});

export const { useLoginMutation } = userAPI;