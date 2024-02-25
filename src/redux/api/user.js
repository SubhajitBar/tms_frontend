import axios from "axios";
import { server } from "../store1";


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "loadUserRequest" });

        const { data } = await axios.get(`${server}/api/v1/me`, { withCredentials: true });

        dispatch({ type: "loadUserSuccess", payload: data.user });
    } catch (error) {
        dispatch({ type: "loadUserFail" });

    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" });
        const { data } = await axios.post(`${server}/api/v1/login`, { email, password }, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true,
        });

        dispatch({ type: "loginSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "loginFail", payload: error.response.data.message });

    }
};

export const logout = () => async (dispatch) => {
    try {
        dispatch({ type: "logoutRequest" });

        const { data } = await axios.get(`${server}/api/v1/logout`, { withCredentials: true });

        dispatch({ type: "logoutSuccess", payload: data.message });

    } catch (error) {
        dispatch({ type: "logoutFail", payload: error.response.data.message });
    }
};


export const register = (name, userName, email, password) => async (dispatch) => {
    try {
        dispatch({ type: "registerRequest" });

        const { data } = await axios.post(`${server}/api/v1/signup`, {name, userName, email, password}, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true,
        });

        dispatch({ type: 'registerSuccess', payload: data.message });


    } catch (error) {
        dispatch({ type: 'registerFail', payload: error.response.data.message });

    }
};
