import axios from "axios"

const instance = axios.create({
  baseURL: 'http://localhost:8000/process',
  timeout: 1000,
  headers: {"Authorization":true,"Content-Type":"application/json"}
});


export default instance