"use client"
import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast";
import axios from "axios";


export default function SignUp(){
    const router = useRouter();
    const[buttonDisabled, setButtonDisabled] = React.useState(true);
    const[loading, setLoading] = React.useState(false);
    const [userData, setUserData] = React.useState({
        email : "",
        username :"",
        password: ""
    })
    useEffect(() =>{
        if(userData.email.length > 0 && userData.username.length > 0 && userData.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    },[userData])

const onSignUp =async () => {
    try{
        setLoading(true);

        //passing the userData in api/users/signup using axios.post
        const response = await axios.post("/api/users/signup", userData);
        console.log("Sign-up success", response.data);
        router.push("/login")
    }catch(error: any){
        console.log(error.message)
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
}

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="mb-5 font-bold">{loading ? "Processing": "Sign Up"}</h1>
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
            <label htmlFor="Username">Username</label>
            <input className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="Username"
                type="text"
                placeholder="username"
                onChange={(e) =>setUserData({...userData, username : e.target.value})}
                value={userData.username}
                name="username"
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
                onClick={onSignUp}
            >{buttonDisabled? "No Sign Up": "Sign-Up" }</button>
            <Link href="/login">Login</Link>
        </div>
        
    )
}