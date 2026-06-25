export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();
  // console.log(token)
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: true,   // Set to true if using HTTPS (leave false for HTTP localhost)
  sameSite: "none", // Critical if frontend and backend are on different domains
    httpOnly: true, // Set httpOnly to true
    path:"/"
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
