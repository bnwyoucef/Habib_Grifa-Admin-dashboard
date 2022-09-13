import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1811/",
});

export default instance;
