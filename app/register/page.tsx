
import Register from "./register"
import axios from "axios" ;
const registerUser = async (userData) =>{
      const registerUserData = await axios.post("/api/users/userRegister", { ...userData } )
      return  registerUserData ;
   }
const LoginPage= () => {
     return (
      <Register />
     )
}
export { registerUser }
export default LoginPage ;
