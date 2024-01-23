import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connect()

export async function POST(request : NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, newPass, confirmPass, token} = reqBody;

        if(!email && token){
            
            if(newPass !== confirmPass){
                return NextResponse.json({
                    error: "Passwords are not Matching"
                }, {status : 400})
            }
            const hashedNewPass = await bcryptjs.hash(newPass, 10);
            const updatedUser = await User.findOneAndUpdate(
                {
                  forgotPasswordToken: token,
                  forgotPasswordTokenExpiry: { $gt: Date.now() },
                },
                { $set: { password: hashedNewPass, forgotPasswordToken: null } },
                { new: true }
              );
              updatedUser.forgotPasswordTokenExpiry = undefined;
              return NextResponse.json({
                message : "Passwod Updated Successfully",
                success : true
            })
        }
        const user  = await User.findOne({email});
        if(!user){
            return NextResponse.json({
                error: "User Not found"
            })
        }
        await sendEmail({email, emailType : "RESET", userId : user._id})
        return NextResponse.json({
            message: "User Can Update now",
            succcess: true
        })
        
    } catch (error : any) {
        console.log(error.message);
    }
}