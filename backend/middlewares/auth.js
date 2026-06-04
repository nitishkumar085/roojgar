import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.cookies.token)
  // const { token } = req.cookies;
  // console.log("token",token)
  // if (!token) {
  //   return next(new ErrorHandler("User Not Authorized", 401));
  // }
  // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // req.user = await User.findById(decoded.id);

  // next();
  // 1. Extract the token from cookies
  const { token } = req.cookies;

  // 2. Check if the token exists
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }

  // 3. Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 4. Fetch the user and attach it to the request object
  // (Excluding the password field from the fetched user object for security)
  req.user = await User.findById(decoded.id).select("-password");

  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // 5. Pass control to the next middleware/controller
  next();
});
