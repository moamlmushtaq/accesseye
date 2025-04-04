import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  user: String,
  repo: String,
  permission: String,
  fetchedAt: Date,
  organization: String,
});

export default mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);
