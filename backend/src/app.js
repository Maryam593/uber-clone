import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import dataConnection from "./db/db.js";
import cookierParser from "cookie-parser"
import AllRoutes from "./Routes/index.js";


dotenv.config();
//db Xonnection
dataConnection();

const myApp = express();
//for creating users
myApp.use(express.json());
//cookie parser
myApp.use(cookierParser())
// Router 
myApp.use(AllRoutes)

const port = process.env.PORT
const crosOrigin = {
    origin : 'localhost:5173',
    methods : ['GET,PUT,POST,PATCH,DELETE'],
    credentials: true,
}
myApp.use(cors(crosOrigin))
// myApp.get("/hello", (req,res)=> {
//     res.json({message:"hello world"})
// })

myApp.listen(port, ()=> {
    console.log(`server is running fine on port ${port}`)
})