const jwt = require("jsonwebtoken");

module.exports = {
  createTokenAccess: (data) => {
    // data ekpektasi object
    const key = "saitama";
    const token = jwt.sign(data, key, { expiresIn: "12h" }); // 12h
    return token;
  },
  createTokenEmailVerified: (data) => {
    // data ekpektasi object
    const key = "garou";
    const token = jwt.sign(data, key, { expiresIn: "3m" }); // 3menit
    return token;
  },
};
