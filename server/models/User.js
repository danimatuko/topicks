import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
		}
	},
	{ timestamps: true }
);

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
