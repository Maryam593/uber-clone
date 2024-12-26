import jwt from "jsonwebtoken";
import BlackListTokenModel from "../model/blackListTokenModel.js";
import CaptainModel from "../model/captainModel.js";

const captainAuthMiddleWare = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(400).json({ message: "Unauthorized Access: Token missing" });
    }

    // Check if the token is blacklisted
    const isBlackListed = await BlackListTokenModel.findOne({ token });
    if (isBlackListed) {
      return res.status(400).json({ Warning: "Unauthorized Access: Token is blacklisted" });
    }

    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find the captain by ID
    const captain = await CaptainModel.findById(decoded._id);
    if (!captain) {
      return res.status(400).json({ message: "Unauthorized Access: User not found" });
    }

    // Attach captain to the request object for further use
    req.captain = captain;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

export default captainAuthMiddleWare;
