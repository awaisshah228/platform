import express from "express";
import userCtrl from "../controllers/userCtrl";
import { body, check, oneOf } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { requireAuth } from "../middlewares/require-auth";
import upload from "../middlewares/upload-file";

const router = express.Router();

router.patch(
  "/",
  requireAuth,
  // [ body("name").notEmpty().withMessage("You must supply a name")],
  // validateRequest,
  upload.single("file"),
  userCtrl.updateUser
);

router.patch("/reset_password", requireAuth,[ body("password")
.trim()
.isLength({ min: 4, max: 20 })
.withMessage("Password must be between 4 and 20 characters"),],validateRequest, userCtrl.resetPassword);

router.get("/:id",requireAuth, userCtrl.getUser);

export default router;
