import connect from "@/dbConfig/dbConfig";
import User  from "@/models/userModel";
import bcryptjs from "bcryptjs"
import axios from "axios";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const check = await User.findOne({email});
        if(!check){
            return NextResponse.json({error: "No user found with this email"}, {status: 400})
        }
        const validPass = await bcryptjs.compare(password, check.password);

        if(!validPass){
            return NextResponse.json({error: "Invalid Password"}, {status: 400});
        }
        
        //creating token
        const tokenData = {
            id : check._id,
            email : check.email,
            username : check.username
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message : "Login Successful",
            success: true
        })
        response.cookies.set("token", token, {
            httpOnly : true
        })

        return response;

    }catch(error: any){
        return NextResponse.json({error : error.message}, {status: 500})
    }
    

}
