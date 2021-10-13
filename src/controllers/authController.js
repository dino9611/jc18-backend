const { connection } = require("./../connections");
const { hashPass } = require("./../helpers");
const crypto = require("crypto");

const hashWord = (word) => {
  // king itu kunci, bebas mau tulis string apa disitu
  let hashing = crypto.createHmac("sha256", "king").update(word).digest("hex");
  return hashing;
};

module.exports = {
  login: (req, res) => {
    console.log("query user", req.query);
    const { username, password } = req.query;
    if (!username || !password) {
      return res.status(400).send({ message: "kurang username or pass" });
    }
    // ? tidak secure rentan dengan serangan sql injection
    // let sql = `select * from user
    // where username= '${username}'
    // aand password= '${password}'`;

    //? secure cara pertama
    // let sql = `select * from user
    //           where username= ${connection.escape(username)}
    //           and password= ${connection.escape(password)}`;

    //? secure cara 2
    let sql = `select * from user where username= ? and password= ?`;

    // console.log(sql);

    connection.query(sql, [username, hashPass(password)], (err, results) => {
      if (err) {
        console.log("error :", err);
        return res.status(500).send({ message: err.message });
      }
      if (!results.length) {
        return res.status(500).send({ message: "user tidak ditemukan" });
      }
      return res.status(200).send(results);
    });
  },
  register: async (req, res) => {
    const { username, password } = req.body;
    // initialize for using promisi in mysqljs
    const connDb = connection.promise();
    try {
      // TODO:
      // cek username ada atau enggak
      // kalo ada return status 500 dan kasih message username telah ada
      // kalo tidak ada add data to user table
      // get lagi datanya kayak login

      //? cek username ada atau enggak
      let sql = `select * from user where username = ?`;
      let [dataUser] = await connDb.query(sql, [username]);
      if (dataUser.length) {
        //? kalo ada return status 500 dan kasih message username telah ada
        throw { message: "username sudah ada" };
      }
      //? kalo tidak ada add data to user table
      sql = `insert into user set ?`;
      let dataInsert = {
        username,
        password: hashPass(password),
      };
      let [result] = await connDb.query(sql, [dataInsert]);
      console.log(result.insertId);
      //? get lagi datanya kayak login
      sql = `select * from user where id = ?`;
      let [dataUserRes] = await connDb.query(sql, [result.insertId]);
      // send response
      return res.status(200).send(dataUserRes);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).send({ message: error.message });
    }
  },
  hashingString: (req, res) => {
    const { kata } = req.query;
    const hasil = hashPass(kata);
    return res
      .status(200)
      .send({ kataawal: kata, panjang: hasil.length, hasilHash: hasil });
  },
};
