import {
  addTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../../../lib/blogs/blog";
import { NextResponse , NextRequest} from "next/server";


const GET = async(request) =>{
  
   return getAllTasks();
}

const POST = async (request) =>{
      const data = await request.json();
      return  NextResponse.json( await addTask(data)) 
}

export { POST , GET}

// addTask, getAllTasks, updateTask, deleteTask  , getTask