import { clearUserData, setUserData } from "../util.js";
import { get, post } from "./request.js";

//TODO (just in case) check the paths
const endpoints = {
    login: "/users/login",
    register:"/users/register",
    logout:"/users/logout"
}

//TODO Adapt user profile to the exam requirements (identity, extra properties, etc.)
export async function login(email, password) {
    const result = await post(endpoints.login, { email, password });
  
    const userData = {
      email: result.email,
      id: result._id,
      token: result.accessToken,
    };
    setUserData(userData);
  }
  
  export async function register(email, password) {
    const result = await post(endpoints.register, { email, password });
  
    const userData = {
      email: result.email,
      id: result._id,
      token: result.accessToken,
    };
    setUserData(userData);
  }
  
  export async function logout(){
    const promise = get(endpoints.logout);
    clearUserData();

    await promise;
  }