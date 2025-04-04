import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  login: String,
  avatar_url: String,
  github_url: String,
  organization: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
