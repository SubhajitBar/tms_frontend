import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: true,
};

export const taskReducer = createReducer({},{
    
    createTaskRequest: state => {
        state.loading = true;
      },
      createTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      createTaskFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },


      deleteTaskRequest: state => {
        state.loading = true;
      },
      deleteTaskSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
      },
      deleteTaskFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
    
   
   
   
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },

})

export const loginReducer = createReducer({}, {

    loginRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // state.user = action.payload.user;
        state.message = action.payload;
    },
    loginFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;
    },
    logoutFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },

    registerRequest: (state) => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        // state.user = action.payload.user;
        state.message = action.payload;

    },
    registerFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },

    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    },
    loadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    

    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
});