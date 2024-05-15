import {NextResponse} from "next/server";

const GET = async () => {
  return NextResponse.json("hello");
};

export {GET}
