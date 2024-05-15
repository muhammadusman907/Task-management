import Login from "./login"
import axios from "axios" ;
const loginUser = async (userData) =>{
      const loginUserData = await axios.post(
        "/api/users/userLogin",
        { ...userData }
      )
      return loginUserData ;
    
   }
const LoginPage= () => {
   
     return (
      <Login />
     )
}
export { loginUser }
export default LoginPage ;
