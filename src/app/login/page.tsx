"use client"
import React, { useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"


export default function Login(){
    const router = useRouter();
    const [userData, setUserData] = React.useState({
        email : "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    useEffect(()=>{
        if(userData.email.length >0 && userData.password.length >0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true);
        }
    }, [userData])
    const [loading, setLoading] = React.useState(false);
const onLogin =async () => {
    try{
        setLoading(true);
        const checkResp = await axios.post("/api/users/login", userData);
        console.log("Login Completed",checkResp.data);
        toast.success("Login success");
        router.push("/profile")
    }catch(error: any){
        console.log(error.message)
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
}

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-5 font-bold">{loading? "Processing": "Log In"}</h1>
            <hr />
            <label htmlFor="email">Email</label>
            <input className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 "
                id="email"
                type="email"
                placeholder="Email"
                onChange={(e) =>setUserData({...userData, email : e.target.value})}
                value={userData.email}
                name="email"
            />
            
            <label htmlFor="Password">Password</label>
            <input className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="Password"
                type="password"
                placeholder="Password"
                onChange={(e) =>setUserData({...userData, password : e.target.value})}
                value={userData.password}
                name="password"
            />
            <button className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onLogin}
            >{buttonDisabled? "Provide Details": "Login"}</button>
            <Link href="/signup">Visit Sign Up</Link>
            <hr />
            <Link href="/forgotpassword">Forgot Password?</Link>
        </div>
        
    )
}