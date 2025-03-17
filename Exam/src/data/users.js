// import { clearUserData, setUserData } from "../util.js";
// import { get, post } from "./request.js";

// const endpoints = {
//     login: "/users/login",
//     register:"/users/register",
//     logout:"/users/logout"
// }

// export async function login(email, password) {
//     const result = await post(endpoints.login, { email, password });
  
//     const userData = {
//       email: result.email,
//       id: result._id,
//       token: result.accessToken,
//     };
//     setUserData(userData);
//   }
  
//   export async function register(email, password) {
//     const result = await post(endpoints.register, { email, password });
  
//     const userData = {
//       email: result.email,
//       id: result._id,
//       token: result.accessToken,
//     };
//     setUserData(userData);
//   }
  
//   export async function logout(){
//     const promise = get(endpoints.logout);
//     clearUserData();

//     await promise;
//   }


import { clearUserData, setUserData, showError } from "../util.js";
import { get, post } from "./request.js";

const endpoints = {
    login: "/users/login",
    register:"/users/register",
    logout:"/users/logout"
}

export async function login(email, password) {
    try {
        const result = await post(endpoints.login, { email, password });

        const userData = {
            email: result.email,
            id: result._id,
            token: result.accessToken,
        };
        setUserData(userData);
    } catch (error) {
        showError("Login failed. Please check your credentials and try again.");
        throw error; // Rethrow the error for further handling if needed
    }
}

export async function register(email, password) {
    try {
        const result = await post(endpoints.register, { email, password });

        const userData = {
            email: result.email,
            id: result._id,
            token: result.accessToken,
        };
        setUserData(userData);
    } catch (error) {
        showError("Registration failed. Please try again later.");
        throw error; // Rethrow the error for further handling if needed
    }
}

export async function logout(){
    try {
        const promise = get(endpoints.logout);
        clearUserData();

        await promise;
    } catch (error) {
        showError("Logout failed. Please try again later.");
        throw error; // Rethrow the error for further handling if needed
    }
}