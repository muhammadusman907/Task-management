import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const getAllBlogs = () => {
  return users;
};

const userRegister = async (req) => {
  console.log("response", req);
  try {
    const { user_name, email, password } = req;
    const passwordHash = bcrypt.hashSync(password, 10);
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    console.log("find user", findUser);
    if (!findUser) {
      const users = await prisma.user.create({
        data: {
          user_name,
          email,
          password: passwordHash,
        },
      });
      const token = jwt.sign({ email : users.email }, "blog_app");
      console.log("users ----->", users);
      return NextResponse.json({
        messge: "users added sucessfully",
        status: 200,
        users ,
        token
      });
      
    } else {
      return NextResponse.json({ err: "user already exist"},{ status: 403 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
      err: "internal server error"},
      {status: 500,
    });
  }
};

const userLogin = async (req) => {  
  try {
    const { email, password } = req;
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (findUser) {
      const passwordMatch = bcrypt.compareSync(password, findUser.password); // true
      if (passwordMatch) {
           const token = jwt.sign({ email: findUser.email }, "blog_app");
           return NextResponse.json({
           message: "login sucessfully",
           token,
           findUser
        });
      }else{
       return NextResponse.json({message : "wrong password"} , {status : 403})
      }
    } else {
      return NextResponse.json({ message: "user not found" }, { status : 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Internal server error"},{ status: 500 });
  }
};
export { userLogin, userRegister };
