import {Router} from "express";
import {
  signUpController,
  signInController,
  logOutController,
  activateEmailController,
  refreshTokenController
} from "../controllers/authController";

const router = Router();

router.post("/sign-up", signUpController);
router.post("/sign-in", signInController);
router.post("/log-out", logOutController);
router.get("/activate-mail/:token", activateEmailController);
router.get("/refresh-token", refreshTokenController);

module.exports = router;
