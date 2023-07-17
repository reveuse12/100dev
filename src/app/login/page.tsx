"use client";
import Link from "next/link";
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login(){
    const router =useRouter();
    const [user,setUser]=React.useState({
        email:"",
        password:"",
    });

    const [buttonDisabled,setButtonDisbaled]=React.useState(false);
    const[loading,setLoading] = React.useState(false);

    const onLogin =async()=>{
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login",user)
            console.log("login success",response.data);
            toast.success("login success");
            router.push("/profile");
        }catch(error:any){
            console.log("login failed",error.message);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setButtonDisbaled(false);
        }else{
            setButtonDisbaled(true);
        }
    }, [user.email.length, user.password.length])
    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "processing":"Login "}</h1>
            <hr />
            
            <label htmlFor="email">Email</label>
            <input type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="email" value={user.email} onChange={e=>setUser({...user,email:e.target.value})} placeholder="Email" />

            <label htmlFor="password">Password</label>
            <input type="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" id="password" value={user.password} onChange={e=>setUser({...user,password:e.target.value})} placeholder="Password" />

            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No login": "Login Now"}</button>
            <Link href="/signup">Not a user Signup here</Link>
        </div>
    )
}