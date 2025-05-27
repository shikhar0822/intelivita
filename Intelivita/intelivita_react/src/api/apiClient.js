import axios from "axios";
// import { logoutRedirect } from "../common/RedirectPath";

const axiosClient = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      'Content-Type' : 'application/json',
    }
});

// Body Encryption Request
axiosClient.interceptors.request.use(function (request) {    
    // request.body = JSON.parse(request.body)
    if(localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== "" && localStorage.getItem("token") != null){
      request.headers['token']=localStorage.getItem("token")
    }
  return request;
});

axiosClient.interceptors.response.use(
  function (response) {
    if(response.code==400){
      
    }
    return response;
  },

  function (error) {
    let res = error.response;
    if (res.status == 401) {
      // logoutRedirect()
    }else if(res.status == 400 || res.status == 500 || res.status == 404){
      return res.data 
    }else{
      return Promise.reject(error);
    }
  }
);

export {axiosClient};