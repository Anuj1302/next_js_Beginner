import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";
connect();


export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const {token} = reqBody;

        const user = await User.findOne({verifyToken : token, verifyTokenExpiry :{$gt: Date.now()}});
        if(!user){
            return NextResponse.json({
                error: "Token Not Found"},
                {status : 400}
            )
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json(
            {message: "User verified",
            success : true
        })
    } catch(error: any){
        throw new Error(error.message);
    }
    
}