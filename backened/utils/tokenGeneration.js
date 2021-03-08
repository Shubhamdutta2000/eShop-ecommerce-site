import jwt from "jsonwebtoken";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_KEY, {
    expiresIn: "30s",
  });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_KEY, {
    expiresIn: "1y",
  });
};

export { generateAccessToken, generateRefreshToken };
