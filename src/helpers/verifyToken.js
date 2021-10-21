const jwt = require("jsonwebtoken");

module.exports.verifyTokenAccess = (req, res, next) => {
  //? tanpa bearer
  // const authHeader = req.headers["authorization"];
  // let token;
  // console.log(authHeader);
  // if (authHeader) {
  //   token = authHeader.split(" ")[1] ? authHeader.split(" ")[1] : authHeader;
  //   console.log(token);
  // } else {
  //   token = null;
  // }
  //? dengan bearer
  // console.log("token", req.token);
  const token = req.token;
  const key = "saitama"; // kata kunci terserah tetapi harus sama dengan createtokennya
  // '213id0naudnqe91381238hadhabd' => {id:110,role_id:3}
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      // console.log("line 22 berenti dinsini file verirytoken");
      return res.status(401).send({ message: "user unauthorized" });
    }

    // console.log("decoded :", decoded);
    // data yang sudah di decript akan di masukkan kedalam variable req.user
    req.user = decoded;
    next();
  });
};

module.exports.verifyEmailToken = (req, res, next) => {
  console.log("token", req.token);
  const token = req.token;
  const key = "garou"; // kata kunci terserah
  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "user unauthorized" });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
};
