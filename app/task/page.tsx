"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
// import Input from  "./../components/input/input" ;
import { useForm, SubmitHandler } from "react-hook-form";
import Box from '@mui/material/Box';
import { TextField , Button , Checkbox } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import MyModal from "../../components/modal/modal" ;
import Loader from  "../../components/loader/loader"
import { getTasks , addTasks , updateTask , delteTask } from "../page" 
import { useRouter } from "next/navigation";
type Inputs = {
  title : string ;
  description : string
};
interface List {
   task: string 
  }
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
export default function Task () {
 const {
   register,
   handleSubmit,
   watch,
   reset ,
   formState: { errors },
 } = useForm<Inputs>();

 const [task , setTask] = useState <(string | {} )[]>([]); 
 const [description, setDescription ] = useState <(string | {} )[]>([]); 
 const [ editData , setEditData ] = useState<{}>({}) ; 
 const [ addUpdate , setAddUpdate ] = useState <string> ("") ;
 const  [taskId , setTaskId ] = useState <string> ("") ; 
 const [loading, setLoading] = useState(false);
 const router = useRouter();
 const userData = JSON.parse (localStorage.getItem ("userData")) ;

 const addTask: SubmitHandler<Inputs> = async (data) => {   
try {
 
   setLoading(true)
  const value :  (string | { title : string , description : string , status : boolean , userId : string } ) = {
          title : data?.title ,
          description : data?.description ,
          userId : userData.id ,
          status : false 
  }
   const response = await addTasks(value) ;
   console.log(response.data)
  setTask ([ ...task , response?.data ]) 
  reset();
  handleClose()
}catch (error){
  console.log(error)
}finally
{
 setLoading(false)
}
  
}
const editTask= (id) => {
      setTaskId (id) ;
}
const updateTaskData = async (data ) => {
 try{   
   setLoading(true)
  const updateData = await updateTask( taskId  , data); 
  // console.log(updateData)
  getAllTask()
  reset();
  handleClose()}catch (error){
  console.log(error)
}finally
{
 setLoading(false)
}
 

}
const updateStatus = async (data , id) =>{
 try{
   setLoading(true)
  const updateData = await updateTask( id , data); 
  console.log(updateData)
  getAllTask()
  reset();
  handleClose() }catch (error){
  console.log(error)
}finally
{
 setLoading(false)
}
 
}

const getAllTask = async () => {
   try{ 
     setLoading(true)
     console.log("userId" , userData?.id)
     const getTaskData = await getTasks(userData?.id) ;
     setTask(getTaskData.data.allTasks)
     console.log( getTaskData ) 
  } catch (error){
      console.log(error)
}
finally{
       setLoading(false)
}
   
}
const deleteTask = async (id) => {
   try{  
     setLoading(true)
    const deleteTask = await delteTask(id);
     getAllTask() 
}catch (error){
  console.log(error)
}finally{
 setLoading(true);
}

};
console.log(editData)
useEffect(() => {
  if(!localStorage.getItem("token")){
          router.push("/login")
  }
    getAllTask ()
} , [])
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{ 
    setOpen(false)
    reset();
  };
  return (
    <>
      <Navbar />
        {loading && <Loader />}
      {console.log(task)}

      <MyModal open={open} handleClose={handleClose}>
        <form
          onSubmit={handleSubmit(
            addUpdate == "addTask" ? addTask : updateTaskData
          )}
          className="flex"
        >
          <Box
            sx={{ width: 500, maxWidth: "100%" }}
            className="flex flex-col gap-5"
          >
            <TextField
              fullWidth
              label="Tittle"
              id="tittle"
              defaultValue = { editData.title }
              className="h-fit"
              {...register("title", { required: true })}
            />
            <TextField
              label="Descriptipn"
              id="description"
              defaultValue ={ editData.description }
              className=" w-full"
              {...register("description", { required: true })}
            />

            <Button type="submit" variant="contained">
              {addUpdate == "addTask" ? "Add Task" : "Update Task"}
            </Button>
          </Box>
        </form>
      </MyModal>

      <div className="container flex justify-end mt-10 m-auto">
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Button
          type="submit"
          variant="contained"
          onClick={() => {
            handleOpen();
            setAddUpdate("addTask"); 
            reset();
          }}
        >
          Add Task <AddIcon className="font-extrabold" />
        </Button>
      </div>
      <h1 className="font-bold text-[1.4rem] text-center">Daily Task</h1>
      <ul className="bg-white shadow overflow-hidden sm:rounded-md max-w-[80%] mx-auto mt-16 flex flex-col flex-col-reverse">
        {task.map(
          (
            value: {
              title: string;
              description: string;
              status: boolean;
              id: string;
            },
            index: number
          ) => (
            <li className="w-full" key={index}>
              <div className="px-4 py-5 sm:px-6">
                <div className="flex justify-between">
                  <div>
                    {value?.status ? (
                      <del>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Task Title: {value?.title}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          <span className="font-bold">Task Description:</span>{" "}
                          {value?.description}
                        </p>
                      </del>
                    ) : (
                      <>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Task Title: {value?.title}
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                          <span className="font-bold">Task Description:</span>{" "}
                          {value?.description}
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    {!value?.status ? (
                      <Checkbox
                        {...label}
                        onChange={(e) => {
                          updateStatus({ status: e.target.checked }, value?.id);
                        }}
                      />
                    ) : (
                      <Checkbox {...label} disabled checked />
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    Status:{" "}
                    <span className="text-green-600">
                      {value?.status ? "compelete" : "Active"}
                    </span>
                  </p>
                  <div className="flex gap-3">
                    <span
                      className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
                      onClick={() => {
                        handleOpen();
                        setAddUpdate("updateTask");
                        setEditData({})
                        setEditData(value)
                        editTask(value?.id);
                        console.log("edit");
                      }}
                    >
                      Edit
                    </span>
                    <span
                      className="font-medium text-red-600  cursor-pointer hover:text-red-500"
                      onClick={() => {
                        deleteTask(value?.id);
                      }}
                    >
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </>
  );
}
