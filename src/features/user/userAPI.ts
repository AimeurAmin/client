import axios from "axios";

export function loginService({ email, password }: any) {
  return axios.post("http://localhost:5000/users/login", { email, password });
}
