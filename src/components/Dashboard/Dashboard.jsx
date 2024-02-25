import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, logout } from "../../redux/api/user";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { deleteTask } from "../../redux/api/task";
import Loader from "../Loader/Loader";

const Dashboard = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.task);

  const deleteHandler = async (id) => {
    await dispatch(deleteTask(id));
    dispatch(loadUser());
    // setTimeout(() => {
    // }, 600);
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

  // useEffect(()=>{
  //   dispatch(loadUser());
  // },[dispatch])
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
                      <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                        <h2 className="mb-3 text-gray-900 text-lg title-font font-medium">
                          {item.title}
                        </h2>
                        <div className="flex-grow">
                          <p className="leading-relaxed text-base">
                            {item.description}
                          </p>
                          <p className="leading-relaxed text-base">
                            {item.dueDate.split("T")[0]}
                          </p>
                          <p className="leading-relaxed text-base">
                            {item.isCompleted ? "Completed" : "Not Completed"}
                          </p>

                          <div className="w-full flex justify-start">
                            <button className="flex mr-4 mt-4 text-white bg-indigo-400 border-0 px-4 py-2 focus:outline-none hover:bg-indigo-500 rounded text-lg">
                              Edit
                            </button>
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
          {/* <Link to="/dashboard" className="mr-5 hover:text-gray-900">Third Link</Link>
          <Link to="/dashboard" className="mr-5 hover:text-gray-900">Fourth Link</Link> */}
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
