const crypto = require("crypto");

module.exports = (word) => {
  // king itu kunci, bebas mau tulis string apa disitu
  let hashing = crypto
    .createHmac("sha256", "puripuriprisoner")
    .update(word)
    .digest("hex");
  return hashing;
};

// const crypto = require("crypto");

// const hashWord = (word) => {
//   // king itu kunci, bebas mau tulis string apa disitu
//   let hashing = crypto.createHmac("sha256", "king").update(word).digest("hex");
//   return hashing;
// };
