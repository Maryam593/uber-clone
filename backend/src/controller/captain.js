import CaptainModel from "../model/captainModel.js"
import { validationResult } from "express-validator";
const captainController = {
getAll : async (req,res) => {
    try {
        const captainData = await CaptainModel.find();
        res.status(200).json({success : "Data found successfully", Data :captainData})
    } catch (error) {
        res.status(500).json({Error : "Internal server error"})
    }
    },
CreateCaptain : async (req,res) => {
    try {
        const {email,password, firstName,lastName, color, vehicle_Type,capacity,plate} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const hashPassword = await CaptainModel.hashPassword(password)
        // if captain already exist 
        const isCaptainAlreadyExist = await CaptainModel.findOne({email : email})
        if(isCaptainAlreadyExist)
        {
            return res.status(401).json({Warning : "Email Already exist"})
        }
        const newCaptain = await CaptainModel.create ({
            FullName : {firstName, lastName}, 
            email, 
            password : hashPassword,
            vehicle : {
                color, vehicle_Type, plate,capacity
            }
        })
     
        if(!newCaptain)
        {
            return res.status(400).json({Warning : "cannot create a captain"})
        }
        const token = newCaptain.generateAuthToken()
        res
        .status(200)
        .json({
          success: "User created successfully",
          Data: token,
          newCaptain,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({Error : "Internal server error"})
    }
},
LoginAsCaptain : async (req,res) => {
 try {
    const {email,password} = req.body;
    const  matchCredentials = await CaptainModel.findOne({email}).select('+password') 
    if(!matchCredentials)
    {
        return res.status(401).json({Warning : "Invalid Credentials"})
    }
    const comparePass = await matchCredentials.comparePassword(password)
    if(!comparePass)
    {
        return res.status(400).json({Warning : "Password doesn't match"})
    }
    //if credentials matched 
    const token =  matchCredentials.generateAuthToken();
    res.cookie('token', token)
    res.status.json({Success : "Login Successfully", Data : token,matchCredentials })
 } catch (error) {
    console.log(error)
    res.status(500).json({Error : "Internal server error"})
 }
},
UpdateCaptainStatus : async (req,res) => {
    try {
        const {status} = req.body;
        const {id} = req.params;
        if(!id || !status)
            return res.status(404).json({Warning:"captain not found or couldnt updated"})
        const updatedCaptain = await CaptainModel.findByIdAndUpdate(
            id, 
            { status: status }, 
            { new: true } 
        );
        res.status(200).json({Success : "Captain status updated successfully", data :updatedCaptain})
    } catch (error) {
        console.log(error)
        res.status(500).json({Error : "Internal server error"})
    }
},
DeActivateCaptainProfile: async (req, res) => {
    try {
        const { email, id } = req.body;
        if (!email && !id) {
            return res
                .status(400)
                .json({ Warning: "Please provide either email or id to deactivate the profile." });
        }
        let deActivateProfile;
        if (email) {
            deActivateProfile = await CaptainModel.findOneAndDelete(
                { email: email },
            );
        } else if (id) {
            deActivateProfile = await CaptainModel.findByIdAndDelete( id,);
        }
        if (!deActivateProfile) {
            return res.status(404).json({ Warning: "Captain profile not found or couldn't be deactivated." });         
        }
        console.log(res)
        res.status(200)
            .json({ Success: "Profile deactivated successfully", data: deActivateProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: "Internal server error" });
    }
}

}

export default captainController