import express from "express";
import authCtrl from "../controllers/authCtrl";
import { body, oneOf } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.post(
  "/register",
  [
    oneOf([
      body("account").isEmail().withMessage("Email must be valid"),
      body("account")
        .custom((value) => {
          const re = /^[+]/g;
          return re.test(value);
        })
        .withMessage("Must provide number"),
    ]),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("name").trim().notEmpty().withMessage("You must supply a name"),
  ],
  validateRequest,
  authCtrl.register
);

router.post("/active", authCtrl.activeAccount);

router.post('/login', authCtrl.login)

router.get('/logout',requireAuth, authCtrl.logout)

router.get('/refresh_token', authCtrl.refreshToken)

router.post('/google_login', authCtrl.googleLogin)

// router.post('/facebook_login', authCtrl.facebookLogin)

// router.post('/login_sms', authCtrl.loginSMS)

// router.post('/sms_verify', authCtrl.smsVerify)

export default router;
