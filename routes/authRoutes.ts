const {Router} = require("express");
const {
  signUpController,
  signInController,
  logOutController,
  activateEmailController,
  refreshTokenController
} = require("../controllers/authController");

const router = Router();

router.post("/sign-up", signUpController);
router.post("/sign-in", signInController);
router.post("/log-out", logOutController);
router.get("/activate-email/:token", activateEmailController);
router.get("/refresh-token", refreshTokenController);

module.exports = router;
