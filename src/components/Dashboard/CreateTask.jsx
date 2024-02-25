import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../redux/api/task";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../../redux/api/user";
import Loader from "../Loader/Loader";
import { Header } from "./Dashboard";

const CreateTask = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector((state) => state.task);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(createTask(title, description, dueDate, isCompleted));
    navigate("/dashboard");
    dispatch(loadUser());
  };
  const navigate = useNavigate();

  useEffect(() => {
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header user={user} />
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 mx-auto flex flex-wrap items-center">
              <form
                onSubmit={submitHandler}
                className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col m-auto w-full mt-10 md:mt-0"
              >
                <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
                  Create Tasks
                </h2>
                <div className="relative mb-2">
                  <label
                    htmlFor="title"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8"
                  />
                </div>
                <div className="relative mb-2">
                  <label
                    htmlFor="description"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    type="text"
                    id="description"
                    name="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8"
                  />
                </div>
                <div className="relative mb-2">
                  <label
                    htmlFor="date"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className=" w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="check"
                    className="leading-7 text-sm text-gray-600 cursor-pointer"
                  >
                    Completed
                  </label>
                  <input
                    type="checkbox"
                    id="check"
                    name="check"
                    checked={isCompleted}
                    onChange={(e) => setIsCompleted(e.target.checked)}
                    className="mx-4 cursor-pointer"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Create
                </button>
              </form>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CreateTask;
