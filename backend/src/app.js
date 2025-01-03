import dotenv from "dotenv";
import express from "express";
import AllRoutes from "./Routes/index.js";
import cors from "cors";
import dataConnection from "./db/db.js";
import cookierParser from "cookie-parser"
dotenv.config();
//db Xonnection
dataConnection();

const myApp = express();

//cookie parser
myApp.use(cookierParser())

const port = process.env.PORT

const crosOrigin = {
    origin : 'http://localhost:5173',
    methods : ['GET,PUT,POST,PATCH,DELETE'],
    credentials: true,
}
myApp.use(cors(crosOrigin))

//for creating users
myApp.use(express.json());
// Router    
myApp.use(AllRoutes)
myApp.listen(port, ()=> {
    console.log(`server is running fine on port ${port}`)
})