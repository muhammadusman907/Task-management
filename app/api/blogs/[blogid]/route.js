import { updateTask, deleteTask, getTask , getAllTasks } from "@/lib/blogs/blog";
import { NextResponse , NextRequest} from "next/server";


const GET = async(request , {params}) =>{
      console.log("params ------> " , params)
      return await  getAllTasks(params.blogid);
}

const PUT = async(request , {params}) => {
      const data = await request.json();
      console.log(data)
      return NextResponse.json(await updateTask(data, params.blogid));
}

const DELETE = async (request , {params}) => {
  return NextResponse.json(await deleteTask(params.blogid));
};
export {  DELETE , PUT , GET  }