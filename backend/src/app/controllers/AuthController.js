const UserService = require("../service/UserService");
const e = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");

const randomCode = () => {
  const codeLength = 6;
  const chars = "0123456789";
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
};
function generateRandomPassword(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}
// Khai báo thông tin OAuth2
const CLIENT_ID =
  "1023814796196-86de2iic6joqp0mpc0oigu0ph4rvhihj.apps.googleusercontent.com"; // Thay bằng Client ID của ứng dụng OAuth2
const CLIENT_SECRET = "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"; // Thay bằng Client Secret của ứng dụng OAuth2
const REDIRECT_URI = "https://developers.google.com/oauthplayground"; // URI chuyển hướng đã đăng ký trong Google Developers Console
const REFRESH_TOKEN =
  "1//04UvO31elxXruCgYIARAAGAQSNwF-L9IrO9uCMisUST9o8I4gKyZWC7wI2x48P5t7a7zS7kJf1K3UwAv66pf2sG98aZ-VN64Jm8s"; // Thay bằng Refresh Token sau khi đã xác thực
const ADMIN_EMAIL_ADDRESS = "donganhbg2k1@gmail.com";
// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const verificationCode = randomCode();
const randomPassword = generateRandomPassword(10);
class AuthController {
  sendVerificationEmail = async (recipientEmail) => {
    try {
      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      const myAccessToken = myAccessTokenObject?.token;
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: ADMIN_EMAIL_ADDRESS,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });

      const mailOptions = {
        from: "Todo App",
        to: recipientEmail,
        subject: "Verify Your Account",
        html: `
          <p>Dear user,</p>
          <p>Thank you for registering. Please use the following verification code to verify your account:</p>
          <h3>${verificationCode}</h3>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,</p>
          <p>Your App Team</p>
        `,
      };

      await transport.sendMail(mailOptions);
      const respon = {
        status: "send_mail_success",
        message: "Verification email sent successfully.",
      };
      return respon;
    } catch (error) {
      console.log(error);
      const e = {
        status: "send_mail_error",
        message: "Error send code",
      };
      return e;
    }
  };

  sendVerificationEmailPassword = async (recipientEmail) => {
    try {
      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      const myAccessToken = myAccessTokenObject?.token;
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: ADMIN_EMAIL_ADDRESS,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refresh_token: REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });

      const mailOptions = {
        from: "Todo App",
        to: recipientEmail,
        subject: "Reset password",
        html: `
          <p>Dear user,</p>
          <p>Thank you for reset. Here your password:</p>
          <h3>${randomPassword}</h3>
          <p>If you did not request this, please ignore this email.</p>
          <p>Best regards,</p>
          <p>Todo App</p>
        `,
      };

      await transport.sendMail(mailOptions);
      const respon = {
        status: "send_mail_success",
        message: "Reset password sent successfully.",
      };
      return respon;
    } catch (error) {
      const e = {
        status: "send_mail_error",
        message: "Error send code",
      };
      return e;
    }
  };
  sendMailPassword = async (req, res) => {
    const userReq = req.body;
    const user = await UserService.findOneByEmail(userReq.email);
    if (user) {
      // Save user details
      // await UserService.save(userReq);
      const req = await this.sendVerificationEmailPassword(userReq.email);
      // Respond with success message
      userReq.password = randomPassword;
      UserService.updateAccountPassword(userReq).then();
      // const req = {
      //   status: "send_reset_success",
      //   massage: "Send reset password success",
      // };
      console.log(req);
      res.json(req);
    } else {
      // Delete uploaded avatar if user already exists
      // fs.unlink(filePath, (err) => {
      //   if (err) {
      //     console.error("Error deleting file:", err);
      //   }
      // });
      const req = {
        status: "error_send",
        massage: 'User doesn"t exist',
      };
      res.json(req);
    }
  };
  sendMail = async (req, res) => {
    const filePath = req.file.path;
    const avatar = req.file.filename;
    const userReq = req.body;
    const user = await UserService.findOneByEmail(userReq?.email);
    req.body.avatar = avatar;
    if (!user) {
      // Save user details
      // await UserService.save(userReq);
      const req = await this.sendVerificationEmail(userReq.email);
      // Respond with success message
      res.json(req);
    } else {
      // Delete uploaded avatar if user already exists
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
      res.json({ msg: "User already exists!" });
    }
  };

  register = async (req, res) => {
    const filePath = req.file.path;
    const avatar = req.file.filename;
    const userReq = req.body;
    const user = await UserService.findOneByEmail(userReq?.email);
    req.body.avatar = avatar;
    if (!user) {
      if (userReq.code === verificationCode) {
        const req = {
          status: "verify_success",
          message: "Verify code success",
        };
        await UserService.save(userReq);
        res.json(req);
      } else {
        const req = {
          status: "verify_error",
          message: "Verify code error",
        };
        res.json(req);
      }

      // Save user details
      // const req = await this.sendVerificationEmail(userReq.email);
      // Respond with success message
      // res.json(req);
    } else {
      // Delete uploaded avatar if user already exists
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
      res.json({ msg: "User already exists!" });
    }
  };
  async login(req, res) {
    const userReq = req.body;
    const user = await UserService.findOneByEmail(userReq.email);
    if (user && userReq.password === user.password) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: `${req.protocol}://${req.host}:${process.env.PORT || 3000}/${
          user.avatar
        }`,
        password: user.password,
        dashboard: user.dashboard,
        role: user.role,
        message_from: user.message_from,
        message_to: user.message_to,
        file: user.file,
      });
    } else {
      res.json({
        msg: "Account does not exist!",
      });
    }
  }

  updateAccount(req, res) {
    UserService.updateAccount(req.body).then();
    res.json({
      msg: "Update Success!",
    });
  }
  async deleteAccount(req, res) {
    const userReq = req.body;
    const respon = await UserService.delete(userReq);
    if (respon === "success") {
      const re = {
        status: "delete_success",
        message: "Delete success",
      };
      res.json(re);
    }
  }

  async getAccountById(req, res) {
    const userReq = req.body;
    const user = await UserService.findOneByEmail(userReq.email);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: `${req.protocol}://${req.host}:${process.env.PORT || 3000}/${
          user.avatar
        }`,
        password: user.password,
        dashboard: user.dashboard,
        role: user.role,
        message_from: user.message_from,
        message_to: user.message_to,
        file: user.file,
      });
    } else {
      res.json({
        msg: "Account does not exist!",
      });
    }
  }
}

module.exports = new AuthController();
