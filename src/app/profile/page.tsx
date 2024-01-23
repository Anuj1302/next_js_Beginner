"use client"
import React from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

export default function Profile(){
    const router = useRouter();
    const[data, setData] = React.useState("nothing")
    const onLogout = async ()=>{
        try{
            await axios.get("/api/users/logout")
            toast.success("Success");
            router.push("/")
            
        }catch(error: any){
            console.log(error.message);
            toast.error(error);
        }
    }
    const getDetail =async () => {
        try {
            const detail = await axios.get("/api/users/me");
            console.log(detail.data);
            setData(detail.data.data._id);
        } catch (error: any) {
            console.log(error.message);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-4xl">Profile!</h1>
            <p>Profile Page</p>
            <hr />
            <h2 className="p-1 rounded bg-green-500">{data==="nothing"? "Nothing": <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button onClick={onLogout} className="py-2 px-2 bg-black text-white ">Log out</button>
            <button onClick={getDetail} className="mt-3 p-2 bg-green-700">Get Details</button>
        </div>
    )
}