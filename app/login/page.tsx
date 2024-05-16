import Login from "./login"
import axios, { AxiosResponse } from "axios";


const loginUser = async (userData : {email : string , password : string }) => {
  const loginUserData: AxiosResponse<{
    data: { token: string; findUser: { id : string , user_name : string , email : string } };
  }> = await axios.post("/api/users/userLogin", {
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
