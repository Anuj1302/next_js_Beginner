"use client"
    
import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
    
export default function ForgotPassword(){
    const router = useRouter();
    const[emailData, setEmail] = useState({
        email : "",
        newPass : "",
        confirmPass : "",
        token :""
    });
    const[error, setError] = useState(false);
    const[canMove, setCanMove] = useState(false);

    const resetPass = async () => {
        try {
            const response = await axios.post("/api/users/forgotpassword", emailData);
            router.push("/passwordupdated");
        }catch (error: any) {
            setError(true);
            throw new Error(error.message)
        }
    }

    const canReset =async () => {
        try {
            const response = await axios.post("/api/users/forgotpassword", emailData);   
            
        }catch (error: any) {
            setError(true);
            throw new Error(error.message)
        }
    }

    useEffect(() =>{
        const tokenUrl = window.location.search.split("=")[1];
        setEmail({...emailData, token : tokenUrl || ""})
    },[])

    useEffect(()=>{
        if(emailData.token){
            setCanMove(true);
        }
    },[emailData.token])

    return(
        <div className="flex flex-col min-h-screen justify-center items-center py-2">
            
            {!canMove && <div><label htmlFor="forgotPass">Enter your Email</label>
            <br />
            <input value= {emailData.email} onChange={(e) => setEmail({...emailData, email : e.target.value})} id="forgotPass" className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text"
            /> <br /> <button onClick={canReset} className="bg-black p-2 text-white">Click here to Reset</button></div>}
            
            {canMove && <div>

                <input value={emailData.newPass} onChange={(e) => setEmail({...emailData, newPass : e.target.value})} placeholder="Enter New Password" className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                type="text" 
                />
                <br/>
                <input value={emailData.confirmPass} onChange={(e) => setEmail({...emailData, confirmPass : e.target.value})} placeholder="Confirm your Password" className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="text" 
                />
                <br/>
                <button onClick={resetPass} className="bg-black p-2 text-white">Submit</button>
                <br />
                <Link href="/login">
                    Login
                </Link>
                </div>
                
            }
            <br/>
            
            {error && 
            <h2>Error: Confirm Password and New Password doesn't match or user not found etc</h2>
            }
        </div>
    )
}