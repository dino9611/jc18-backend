const crypto = require("crypto");

module.exports = (word) => {
  // king itu kunci, bebas mau tulis string apa disitu
  let hashing = crypto
    .createHmac("sha256", "puripuriprisoner")
    .update(word)
    .digest("hex");
  return hashing;
};
