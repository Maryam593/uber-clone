import { Router } from "express";
import userAuthController from "../controller/user.js";
import {body} from "express-validator";
import userAuthMiddleware from "../middleware/auth_middleware.js";
const userRouter = Router()

userRouter.get("/AllUsers", userAuthMiddleware,userAuthController.AllUsers)
userRouter.post("/register",[body('Email').isEmail().withMessage("Invalid email"), body('FullName.firstName').isLength({min:3}).withMessage("must contain 3 alphabets atleast"),body('password').isLength({min:5}).withMessage ("password string least contain 5 elements and cannot be greater then 25 elements")
  
], userAuthController.SignUp);
userRouter.post("/SignIn",userAuthMiddleware,userAuthController.SignIn);
userRouter.delete("/RemoveUser/:firstName", userAuthMiddleware,userAuthController.DeleteUser)
userRouter.get("/Logout",userAuthMiddleware ,userAuthController.LogOut)
export default userRouter