import Login from "./login"
import axios, { AxiosResponse } from "axios";


const loginUser = async (userData : {email : string , password : string }) => {
  const loginUserData = await axios.post("/api/users/userLogin", {
    ...userData,
  });
  return loginUserData;
};
const LoginPage= () => {
   
     return (
      <Login />
     )
}
export { loginUser }
export default LoginPage ;
