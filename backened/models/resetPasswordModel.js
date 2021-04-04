import mongoose from "mongoose";

const resetPasswordSchema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  accessToken: {
    type: String,
  },
  isValid: {
    type: Boolean,
    default: false,
  },
});

const resetPassword = mongoose.model("resetPassword", resetPasswordSchema);
export default resetPassword;
