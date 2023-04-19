const User = require("../models/User");
const Token = require("../models/Token");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  sendVerificationEmail,
  sendResetPasswordEmail,
  createHash,
} = require("../utils");
const crypto = require("crypto");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("User Already Exists");
  }

  //first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const forwardedHost = req.get("x-forwarded-host");
  const forwardedProtocol = req.get("x-forwarded-proto");
  const origin = `${forwardedProtocol}://${forwardedHost}`;

  await sendVerificationEmail({ name, email, verificationToken, origin });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Success! Please check your email." });
};

const verifyEmail = async (req, res) => {
  const { email, verificationToken } = req.body;

  if (!email || !verificationToken) {
    throw new CustomError.BadRequestError(
      "Invalid Verification, Please Check Your Email."
    );
  }

  //find the user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.BadRequestError(
      "Invalid Verification, Please Check Your Email."
    );
  }

  //check the verification token
  if (user.verificationToken !== verificationToken) {
    throw new CustomError.BadRequestError(
      "Invalid Verification, Please Check Your Email."
    );
  }

  if (user.isVerified) {
    throw new CustomError.BadRequestError("Email is Already Verified.");
  }
  //update isVerified

  user.isVerified = true;
  user.verified = new Date(Date.now());
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Success!, Email is Verified.", user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please Provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  if (!user.isVerified) {
    throw new CustomError.UnauthenticatedError("Please verify your email.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials.");
  }
  const tokenUser = createTokenUser(user);
  //create refresh token
  let refreshToken = "";
  //check for existing token

  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;

    if (!isValid) {
      throw new CustomError.UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
  } else {
    refreshToken = crypto.randomBytes(40).toString("hex");
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
    const userToken = { refreshToken, ip, userAgent, user: user._id };

    await Token.create(userToken);
  }

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user is logged out." });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError("Please Provide a valid Email");
  }

  const user = await User.findOne({ email });

  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");
    //send email
    const origin = `${req.get("x-forwarded-proto")}://${req.get(
      "x-forwarded-host"
    )}`;
    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;
    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);
    user.passwordToken = createHash(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;
    await user.save();
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "please check your email for reset password link." });
};

const resetPassword = async (req, res) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token) {
    throw new CustomError.BadRequestError("please provide all values");
  }

  const user = await User.findOne({ email });

  if (user) {
    const currentDate = new Date();

    if (
      user.passwordToken === createHash(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;
      await user.save();
    }
  }
  res.status(StatusCodes.OK).json({ msg: "Password Reset Successful" });
};

module.exports = {
  register,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
