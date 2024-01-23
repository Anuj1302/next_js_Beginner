import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import connect from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request : NextRequest){
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        const check = await User.findOne({email});

        if(check){
            return NextResponse.json({error: "User Already Exists"}, {status : 400});
        }

        //hashing Password
        const salt = await bcryptjs.genSalt(10)
        const hashPass = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username : username,
            email : email,
            password : hashPass 
        })
        const savedUser = await newUser.save();
        console.log(savedUser);

        await sendEmail({email, emailType : "VERIFY", userId : savedUser._id})

        return NextResponse.json({
            message: "User created Successfully",
            success : true,
            savedUser
        })
    }
    catch(error: any){
        return NextResponse.json({error : error.message}, {status: 500})
    }
}