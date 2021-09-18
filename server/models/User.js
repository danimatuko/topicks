import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const activity = mongoose.Schema(
	{
		likedPosts: { type: [mongoose.Schema.Types.ObjectId] },
		favoraites: { type: [mongoose.Schema.Types.ObjectId] },
		savedForLater: { type: [mongoose.Schema.Types.ObjectId] },
		Post: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Post"
		}
	},
	{ timestamps: true }
);

const userSchema = mongoose.Schema(
	{
		first_name: {
			type: String,
			required: true
		},
		last_name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true,
			default: "user"
		},
		activity: {
			likedPosts: { type: [mongoose.Schema.Types.ObjectId] },
			favoraites: { type: [mongoose.Schema.Types.ObjectId] },
			savedForLater: { type: [mongoose.Schema.Types.ObjectId] },
			Post: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Post"
			}
		}
	},
	{ timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
