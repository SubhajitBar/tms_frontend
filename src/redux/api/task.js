import axios from "axios";
import { server } from "../store1";


export const createTask = (title, description, dueDate, isCompleted) => async (dispatch) => {
    try {
        
        dispatch({ type: 'createTaskRequest' });

        const { data } = await axios.post(`${server}/api/v1/task`, { title, description, dueDate, isCompleted }, {
            headers: {
                "Content-Type": "application/json"
            }, withCredentials: true,
        }
        );

        dispatch({ type: 'createTaskSuccess', payload: data.message });
    } catch (error) {
        dispatch({
            type: 'createTaskFail',
            payload: error.response.data.message,
        });
    }
};

export const updateTask = (id, title, description, dueDate, isCompleted) => async (dispatch) => {

  try {
      dispatch({ type: "updateTaskRequest" });

      const { data } = await axios.put(`${server}/api/v1/task/${id}`,
          { title, description, dueDate, isCompleted }, {
          headers: {
              "Content-Type": "application/json"
          }, withCredentials: true,
      });
      dispatch({ type: "updateTaskSuccess", payload: data.message });

  } catch (error) {
      dispatch({ type: "updateTaskFail", payload: error.response.data.message })
  }
};

export const deleteTask = (id) => async (dispatch) => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch({ type: 'deleteTaskRequest' });
  
      const { data } = await axios.delete(`${server}/api/v1/task/${id}`, config);
  
      dispatch({ type: 'deleteTaskSuccess', payload: data.message });
    } catch (error) {
      dispatch({
        type: 'deleteTaskFail',
        payload: error.response.data.message,
      });
    }
  };