"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function VerifyEmailPage() {
    const[verified, setVerified] = useState(false);
    const[token, setToken] = useState("");
    const[error, setError] = useState(false);

    const onVerify =async () => {
        try{
            const userId = await axios.post("/api/users/verifyemail", {token});
            setVerified(true);
        }catch(error: any){
            setError(true);
            throw new Error(error.message)
        }
    }
    useEffect(()=>{
        const tokenUrl = window.location.search.split("=")[1];
        setToken(tokenUrl || "");
    },[])
    useEffect(()=>{
        if(token.length > 0){
            onVerify();
        }
    },[token])
    return(
        <div className="flex flex-col items-center min-h-screen justify-center">
            <h1>Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "No Token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl">Error</h2>
                    
                </div>
            )}
        </div>
    )
}