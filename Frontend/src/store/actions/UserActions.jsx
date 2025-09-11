import axios from "../../api/axiosConfig";
import { loaduser } from "../reducers/UserSlice";

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
    localStorage.setItem("user", JSON.stringify(data[0]));
  } catch (error) {
    console.log(error);
  }
};

export const asyncLogoutUser = (user) => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
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
