import mongoose, { Schema, Document } from "mongoose";

// Interface for User Model
export interface IUser extends Document {
    fullname: string;
    email: string;
    password: string;
    isActive: boolean;
    profilePic: string;
    createdAt: Date;
    updatedAt: Date;
}

// Schema definition for User
const userSchema = new Schema<IUser>({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePic: {
        type: String,
        default:""
    },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
