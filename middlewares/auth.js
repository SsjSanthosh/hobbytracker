const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Get token from req body header
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token, unauthorized access denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    console.log(req.user.id);
    next();
  } catch (err) {
    res.status(500).json({ msg: "Invalid token" });
    next();
  }
};
