const RefreshToken = require("../models/RefreshToken");
const User = require("../models/user");
const helper = require("../utils/helper");

async function listUsers(req, res) {
  const users = await User.find({})
    .select("-password") // Exclude the password field in the response
    .exec();
  return res.status(200).json(users);
}

async function createUser(req, res) {
  const { email, firstName, lastName, password, phone } = req.body;
  const passwordHash = await helper.hashPassword(password);

  try {
    const user = await User.create({
      email,
      firstName,
      lastName,
      password: passwordHash,
      phone, // Optional, can be omitted in request body
    });

    const userResponse = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    };

    return res.status(201).json(userResponse);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid Email" });
  }

  const isPasswordCorrect = await helper.comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ error: "Invalid Password" });
  }

  const payload = {
    email: user.email,
    id: user.id,
  };

  const accessToken = helper.issueAccessToken(payload);
  const refreshToken = await helper.createRefreshToken(user.id);

  return res.status(200).json({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    accessToken,
    refreshToken,
  });
}

async function refreshToken(req, res) {
  const { refreshToken: refreshTokenUUID } = req.body;

  const refreshToken = await RefreshToken.findOne({
    token: refreshTokenUUID,
  }).populate("user");

  if (!refreshToken) {
    return res.status(404).json({ error: "Invalid refresh token" });
  }

  const isExpired = helper.verifyRefreshTokenExpiration(refreshToken);

  if (isExpired) {
    await RefreshToken.findByIdAndDelete(refreshToken._id).exec();
    return res.status(403).json({ error: "Refresh token is expired" });
  }

  const payload = {
    email: refreshToken.user.email,
    id: refreshToken.user.id,
  };

  await RefreshToken.findByIdAndDelete(refreshToken._id).exec();

  const newAccessToken = helper.issueAccessToken(payload);
  const newRefreshToken = await helper.createRefreshToken(payload.id);

  return res.status(200).json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
}

async function whoami(req, res) {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    phone: req.user.phone,
  });
}

module.exports = {
  createUser,
  listUsers,
  loginUser,
  whoami,
  refreshToken,
};