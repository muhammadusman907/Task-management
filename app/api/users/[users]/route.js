import { NextResponse, NextRequest } from "next/server";

const GET = async (request, { params }) => {
  console.log("params ------> ", params);
  return NextResponse.json(params);
};

export { GET };
