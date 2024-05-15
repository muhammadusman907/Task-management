import { NextResponse } from "next/server";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllTasks = async (id) => {
  try{
    const allTasks = await prisma.task.findMany({where : { 
      userId : id
    }}); 
    console.log(allTasks)
    return NextResponse.json({message : "response sucessfully" , allTasks});
  }
  catch(error){
    console.log(error)
    return NextResponse.json({message : "internal server error" , error});
  }
 
};

const addTask = async (req) => {
  try {
    console.log(req)
    const { title , description , userId , status } = req;
    console.log(title, description, userId);
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
        status
      },
    });
  // console.log( "blog ---->" , blog)
    return task ;
  } catch (error) {
    console.log(error);
  }
};
const deleteTask = async (id) =>{ 
return await prisma.task.delete({
  where: { id },
});
}
const updateTask = async( req , id) =>{
  console.log(req)
  try {
    console.log(id);
const updateTask = await prisma.task.update({
  where: { id },
  data: { ...req },
});

  return  updateTask ;
  } catch (error) {
    console.log(error)
  }
}
const getTask = async (id) => {
    try{
    const singleTask = await prisma.task.findUnique({where : { 
      id 
    }})
    console.log("sigle blog" , singleTask)
    return NextResponse.json({message : "response sucessfully" , singleTask});
  }
  catch(error){
    console.log(error)
    return NextResponse.json({message : "internals server error" , error});
  }
}


export { addTask, getAllTasks, updateTask, deleteTask  , getTask};
