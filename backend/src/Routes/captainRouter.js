import Router from "express";
import { body } from "express-validator";
import captainController from "../controller/captain.js";
import captainAuthMiddleWare from "../middleware/captain_auth_middleware.js";
const captainRouter = Router();

captainRouter.post("/registerCaptain", [
  body("email").isEmail().withMessage("invalid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage(
      "password string least contain 5 elements and cannot be greater then 25 elements"
    ),
  body("FullName.firstName")
    .isLength({ min: 3 })
    .withMessage("must contain 3 alphabets atleast"),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("vehicle color must contain least 3 characters"),
  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("vehicle plate number must contain 3 chraracters"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("vehicle capacity atleast have capacity of 1"),
  body("vehicle.vehicle_Type")
    .isIn(["car", "motorcycle", "rickshaw"])
    .withMessage("invalid choice"),
],captainController.CreateCaptain);

captainRouter.post("/LoginAsCaptain", captainAuthMiddleWare, captainController.LoginAsCaptain)
captainRouter.patch("/updateCaptainStatus/:id", captainController.UpdateCaptainStatus)
captainRouter.get("/AllCaptainProfiles",captainAuthMiddleWare,captainController.getAll)
captainRouter.delete("/DeActivateCaptainProfile",captainAuthMiddleWare,captainController.DeActivateCaptainProfile)
export default captainRouter;
