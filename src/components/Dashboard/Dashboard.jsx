import React, { useState } from "react";
import { Link} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, logout } from "../../redux/api/user";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { deleteTask, updateTask } from "../../redux/api/task";
import Loader from "../Loader/Loader";

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [taskID, setTaskID] = useState(null);
  const [taskComplitionStatus, setTaskComplitionStatus] = useState(null);
  const [taskTitle, setTaskTitle] = useState(null);

  const { loading, error, message } = useSelector((state) => state.task);

  const openModalHandler = (id, title, isCompleted) => {
    setTaskID(id);
    setTaskTitle(title);
    setTaskComplitionStatus(isCompleted);
    setShowModal(true);
  };

  const deleteHandler = async (id) => {
    await dispatch(deleteTask(id));
    dispatch(loadUser());
  };

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
            <div className="container px-5 py-10 mx-auto">
              <div className="text-center mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
                  All Tasks
                </h1>
              </div>
              <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
                {user &&
                  user.tasks &&
                  user.tasks.map((item, idx) => (
                    <div className="p-4 md:w-1/3" key={idx}>
                      <div className="flex rounded-lg h-fit bg-gray-100 p-8 flex-col">
                        <h2
                          className="mb-3 text-gray-900 text-lg title-font font-medium"
                          style={{ overflowWrap: "break-word" }}
                        >
                          {item.title}
                        </h2>
                        <div className="flex-grow">
                          <p
                            className="leading-relaxed text-base"
                            style={{ overflowWrap: "break-word" }}
                          >
                            {item.description}
                          </p>
                          <p className="leading-relaxed text-base">
                            {item.dueDate.split("T")[0]}
                          </p>
                          <p className="leading-relaxed text-base">
                            {item.isCompleted ? "Completed" : "Not Completed"}
                          </p>

                          <div className="w-full flex justify-start items-start">
                            <button
                              onClick={() =>
                                openModalHandler(
                                  item._id,
                                  item.title,
                                  item.isCompleted
                                )
                              }
                              className="flex mr-4 mt-4 text-white bg-indigo-400 border-0 px-4 py-2 focus:outline-none hover:bg-indigo-500 rounded text-lg"
                            >
                              Edit
                            </button>
                            {showModal ? (
                              <Modal
                                setShowModal={setShowModal}
                                taskID={taskID}
                                taskTitle={taskTitle}
                                taskComplitionStatus={taskComplitionStatus}
                              />
                            ) : null}
                            <button
                              onClick={() => deleteHandler(item._id)}
                              className="flex mr-4 mt-4 text-white bg-indigo-400 border-0 px-4 py-2 focus:outline-none hover:bg-indigo-500 rounded text-lg"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Dashboard;

export const Header = ({ user }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="text-gray-600 bg-gray-200 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to={"/dashboard"}
          className="flex flex-col title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <span className="ml-3 text-xl">{user && user.userName}</span>
          <span className=" text-sm font-normal">{user && user.email}</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link
            to="/dashboard"
            className="mr-5 hover:text-gray-900 active:text-gray-900"
          >
            All Task
          </Link>
          <Link
            to="/create_task"
            className="mr-5 hover:text-gray-900 active:text-gray-900"
          >
            Create Task
          </Link>
          
        </nav>
        <button
          onClick={logoutHandler}
          className="inline-flex items-center text-white bg-indigo-600 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-700 rounded text-base mt-4 md:mt-0"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

const Modal = ({
  setShowModal,
  taskID,
  taskTitle,
  taskComplitionStatus,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(
      updateTask(taskID, title, description, dueDate, isCompleted)
    );
    dispatch(loadUser());
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}

          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <form
                onSubmit={submitHandler}
                className=" bg-gray-100 rounded-lg p-8 flex flex-col m-auto w-full mt-10 md:mt-0"
              >
                <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
                  Edit - {taskTitle}
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
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className=" w-full bg-white rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="check"
                    className="leading-7 text-sm text-gray-600 "
                  >
                    {taskComplitionStatus === false
                      ? "Completed"
                      : "Task already completed"}
                  </label>
                  {taskComplitionStatus === false ? (
                    <input
                      type="checkbox"
                      id="check"
                      name="check"
                      checked={isCompleted}
                      onChange={(e) => setIsCompleted(e.target.checked)}
                      className="mx-4 cursor-pointer"
                    />
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-black bg-gray-300 border-0 my-3 py-2 px-8 focus:outline-none hover:bg-gray-400 rounded text-lg"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
