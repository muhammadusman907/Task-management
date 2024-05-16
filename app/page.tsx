import dynamic from "next/dynamic";
import axios from "axios" 
const Task = dynamic(() => import("./task/task"), {
  ssr: false,
});
const getTasks = async (id) => {
      console.log(id)
      const data =  await  axios.get(`api/blogs/${id}`)  
      return data ;
}
const addTasks = async (addData) =>{
      const data =  await axios.post(`api/blogs` , { ...addData })
      return data ;
}
const updateTask  = async (id , updateData ) =>{
      console.log(id )
  const data =  await axios.put(`api/blogs/${id}` , { ...updateData})
  return data ;
}
const delteTask = async (id) => {
      const data =  await axios.delete (`api/blogs/${id}`)
      return data ;
}

const Home = () => {

  return (
   <Task />
  )
}

export default Home ;
export { getTasks , addTasks , updateTask , delteTask }