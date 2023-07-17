"use client"
import {useRouter} from "next/navigation";
import axios from "axios";
import { Toast, toast } from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";

export default function Profilepage(){
    const router = useRouter()
    const [data,setdata] =useState("nothing")
    const logout =async()=>{
         try{
            await axios.get("/api/users/logout");
            toast.success("logout successfull");
         }catch(error:any){
            console.log(error.message);
            toast.error(error.message);
         }
    };

    const getUserdeatils = async()=>{
        const res = await axios.get("/api/users/me")
        console.log(res.data);
        setdata(res.data.data._id);
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2" >
            <h1>Profile</h1>
            <hr />
            <h2>Profile page</h2>
            <h2 className="p-1 rounded bg-lime-950">{data==="nothing"?"nothing":<Link href={`/profile/${data}`}>{data} </Link>}</h2>
            <button className="bg-blue-500 mt-4 hover:bg-black-500" onClick={logout}>Logout</button>
            <button className="bg-purple-500 mt-4 hover:bg-black-500" onClick={getUserdeatils}>Get user details</button>
        </div>
    )
}