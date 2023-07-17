import { getDatafromtoken } from "@/helpers/getDatafromtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/model/userModel";
import { connect } from "@/dbconfig/dbConfig";

connect();
export async function GET(request:NextRequest){
    try{
        const userID= await getDatafromtoken(request);
       const user = await User.findOne({_id:userID}).select("-password");
       return NextResponse.json({message:"user found",data:user})

    }catch(error:any){
       return NextResponse.json({error:error.message},{status:400});
    }
}