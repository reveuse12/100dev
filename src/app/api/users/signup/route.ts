import {connect} from "@/dbconfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request:NextRequest) {
    try{
        const reqBody = await request.json();
        const {username,email,password} = reqBody; 
        console.log(reqBody);

        //if already auser
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user already exist"},{status:400});
        }

        // encryoting password
        const salt =await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        //user
        const newUSer = new User({
            username,
            email, 
            password:hashedPassword
        })

        const savedUser =await newUSer.save();
        console.log(savedUser);

        return NextResponse.json({
            message:"user create successfully",
            success:true,
            savedUser
        });

    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500});
    }
}