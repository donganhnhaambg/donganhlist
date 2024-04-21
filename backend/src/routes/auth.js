const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/AuthController");
const {
  RequestUserDto,
  RequestUserLoginDto,
} = require("../app/validator/dto/Validator");
const {
  handleValidationErrors,
} = require("../app/validator/handleValidationErrors");
const { uploadImage } = require("../config/upload");

router.post(
  "/sendmail",
  uploadImage.single("avatar"),
  RequestUserDto,
  handleValidationErrors,
  authController.sendMail
);
router.post(
  "/sendmailpassword",
  handleValidationErrors,
  authController.sendMailPassword
);
router.post(
  "/register",
  uploadImage.single("avatar"),
  RequestUserDto,
  handleValidationErrors,
  authController.register
);
router.post(
  "/login",
  RequestUserLoginDto,
  handleValidationErrors,
  authController.login
);
router.post(
  "/update",
  RequestUserDto,
  handleValidationErrors,
  authController.updateAccount
);
router.post("/delete", handleValidationErrors, authController.deleteAccount);
router.post("/me", handleValidationErrors, authController.getAccountById);

module.exports = router;
