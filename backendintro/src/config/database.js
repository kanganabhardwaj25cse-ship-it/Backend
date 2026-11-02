import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
dotenv.config({
    path: "./.env"
});
console.log("MongoDB URI loaded:", !!process.env.MONGODB_URI);
const startServer=async()=>{
    try{
        await connectDB();
        app.on("error",(error)=>{
            console.log("error",error);
            throw error;
        });
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    }
    catch(error){
        console.log("error",error);
    }
}
startServer();