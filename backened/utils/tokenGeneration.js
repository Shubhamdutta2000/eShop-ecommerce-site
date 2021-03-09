import jwt from "jsonwebtoken";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_KEY, {
    expiresIn: "10d",
  });
};

export { generateAccessToken };
