import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js";
export const verifyJWT = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        if (!token) {
            throw new ApiError(401,"Unauthorized request")
        }
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if (!user)
        {
            throw new ApiError(404,"User not found with given token")
        }
        req.user = user;
        next();
    } catch (error) {
    throw new ApiError(
        401,
        error?.message || "Invalid access token"
    );
}
})

// Video listings are public, so viewing an uploaded video must work for a
// logged-out visitor too. When a valid token is present we still attach the
// viewer, allowing the video response to include their like/subscription state.
export const optionalJWT = async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (user) {
            req.user = user;
        }
    } catch {
        // A public video should remain viewable even if a stale browser token
        // is sent. Protected actions continue to use verifyJWT.
    }

    return next();
};
