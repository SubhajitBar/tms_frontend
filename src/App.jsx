import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateTask from "./components/Dashboard/CreateTask";
import Loader from "./components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/api/user";
import { ProtectedRoute } from "protected-route-react";

const App = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user, error, message } = useSelector(
    (state) => state.login
  );

  useEffect(() => {
    dispatch(loadUser());
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route
              path={"/"}
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/dashboard"
                >
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/dashboard"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/dashboard"
                >
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Dashboard user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create_task"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CreateTask user={user} />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </>
      )}
    </Router>
  );
};

export default App;
