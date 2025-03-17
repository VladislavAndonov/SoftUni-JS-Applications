import { getUserData, clearUserData } from "../util.js";

//TODO (just in case) check the server domain
const host = "http://localhost:3030";

async function request(url, options) {
  try {
    const response = await fetch(host + url, options);

    if (response.ok != true) {
      if (response.status == 403) {
        clearUserData();
      }
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    //TODO add custom error handling and visualization based on exam requirements;
    alert(error.message);
    throw error;
  }
}

function createOptions(method = "get", data){
  const options = {
    method,
    headers: {}
  };

  if (data){
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  const userData = getUserData();
  if (userData != null) {
    options.headers["X-Authorization"] = userData.token;
  }

  return options;
}

export async function get(url) {
  return request(url, createOptions());
}
export async function post(url, data) {
  return request(url, createOptions("post", data));
}
export async function put(url, data) {
  return request(url, createOptions("put", data));
}
export async function del(url) {
  return request(url, createOptions("delete"));
}
