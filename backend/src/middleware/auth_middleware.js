import UserAuthModel from "../model/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import BlackListTokenModel from "../model/blackListTokenModel.js";

const userAuthMiddleware = async (req, res, next) => {
    try {
      // Step 1: Check if there's a token (just like the guard checking for an ID card)
      const token =req.cookies.token ||  req.headers.authorization?.split(" ")[1];
  
      if (!token) {
        // Step 2: If no token, deny access (like no ID card = no entry)
        return res.status(400).json({ message: "Unauthorized Access: Token missing" });
      }
      //for logging out 
      const isBlackList = await BlackListTokenModel.findOne({token}
      )
      if(isBlackList)
      {
        return res.status(400).json({message : "UnAuthorized Access"})
      }
  
      // Step 3: Decode the token (like checking the validity of the ID card)
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
      // Step 4: Verify user exists in the database (like verifying the student’s name)
      const user = await UserAuthModel.findById(decoded._id);
      if (!user) {
        return res.status(400).json({ message: "Unauthorized Access: User not found" });
      }
  
      // Step 5: Attach user data to the request (like allowing the student to enter the school)
      req.user = user;
  
      // Step 6: Allow the request to proceed (student is allowed inside)
      return next();
    } catch (error) {
      console.error("Error in authentication middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
export default userAuthMiddleware