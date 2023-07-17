import mongoose from "mongoose";

const userScheme =new mongoose.Schema({
    username:{
        type:String,
        reqired:[true,"please provide email!!"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"give me password"]
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry:Date,
    verfiyToken:String,
    verfiyTokenExpiry:Date,
});

const User = mongoose.models.user || mongoose.model("Users", userScheme);

export default User;