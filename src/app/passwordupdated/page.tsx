"use client"
import Link from "next/link"
import React from "react"


export default function PasswordUpdated(){
    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2>Password Updated Successfully</h2>
        <Link href="/login">Login</Link>
    </div>
    )
}