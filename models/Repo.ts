import mongoose from "mongoose";

const RepoSchema = new mongoose.Schema({
  name: String,
  full_name: String,
  private: Boolean,
  organization: String,
});

export default mongoose.models.Repo || mongoose.model("Repo", RepoSchema);
