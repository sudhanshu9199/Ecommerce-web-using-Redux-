import { toast } from "react-toastify";
import axios from "../../api/axiosConfig";
import { loaduser, removeUser } from "../reducers/UserSlice";

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const asyncLoginUser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    if (data[0]) {
      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(loaduser(data[0]));
      toast.success('Login successful!')
    } else toast('Invalid credentials');
  } catch (error) {
    console.log(error);
  }
};

export const asyncLogoutUser = (user) => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    toast('You are successfully Logout!')
    dispatch(removeUser());
    console.log("User logged out!");
  } catch (error) {
    console.log(error);
  }
};

export const asyncCurrentUser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        dispatch(loaduser(user));
        console.log('Logged!');
        
    }
    else console.log('User not logged-in!');
    
  } catch (error) {
    console.log(error);
  }
};

export const asyncUpdateUser = (id, user) => async (dispatch, getState) => {
    try {
        const { data } =  await axios.patch('/users/' + id, user);
        localStorage.setItem("user", JSON.stringify(data));
        dispatch(loaduser(data));
    } catch (error) {
        console.log(error);
    }
}

export const asyncDeleteUser = (id) => async (dispatch, getState) => {
    try {
        await axios.delete('/users/' + id);
        dispatch(asyncLogoutUser());
        toast.success('Deleted successfully!')
    } catch (error) {
        console.log(error);
    }
}