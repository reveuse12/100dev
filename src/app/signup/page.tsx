"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup(){
    const router = useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
        username:""
    })
    const[buttonDisabled,setButtonDisabled]=React.useState(false);
    
    const [loading,setLoading] = React.useState(false);

    const onSignup =async()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup",user);
            console.log("signup sucess",response.data);
            router.push("/login");
        }catch(error:any){
            console.log("signup failed");
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length> 0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false); 
        }else{
            setButtonDisabled(true);
        }
    },[user]);
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Loading pls wait":"Signup"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="username" value={user.username} onChange={e=>setUser({...user,username:e.target.value})} placeholder="Username" />
            
            <label htmlFor="email">Email</label>
            <input type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="email" value={user.email} onChange={e=>setUser({...user,email:e.target.value})} placeholder="Email" />

            <label htmlFor="password">Password</label>
            <input type="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="password" value={user.password} onChange={e=>setUser({...user,password:e.target.value})} placeholder="Password" />

            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ?"No signup":"Signup"}</button>
            <Link href="/login">Already a user login here</Link>
        </div>
    )
}