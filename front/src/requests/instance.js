import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:4000'
  });

  export function setToken(token){
    apiInstance.defaults.headers.common['authorization'] = `Bearer ${token}`;
  }; 

  export function removeToken(token){
    apiInstance.defaults.headers.common['authorization'] = "";
  }; 

  export default apiInstance;
