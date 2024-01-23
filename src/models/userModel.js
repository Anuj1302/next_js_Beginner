import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please fill this field"],
        unique: true
    },
    email : {
        type : String,
        required : [true, "Please fill this field"],
        unique: true
    },
    password : {
        type : String,
        required : [true, "Please fill this field"]
    },
    isVerified : {
        type : Boolean,
        default: false
    },
    isAdmin : {
        type: Boolean,
        default : false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry: Date,
    verifyToken : String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users ||  mongoose.model("users", UserSchema);
export default User;