import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";  

const userSchema=new Schema(
    {
        username:{
            type: String,
            required:true,
            unique:true,
            lowercasse:true,
            trim:true,
            minlength:1,
            maxlemgth:30
        },
        password:{
            type: String,
            required:true,
            minlength:6,
            maxlength:50
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercasse:true,
            trim:true,

        },
    },
    {
        timestamp:true
    }
)

//before saving any password, we will hash it using bcryptjs
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//compare the password entered by the user with the hashed password stored in the database
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
export const User=mongoose.model("User",userSchema);