"use strict";
const { connection } = require("./../connections");
const { hashPass, createToken, transporter } = require("./../helpers");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const { createTokenAccess, createTokenEmailVerified } = createToken;

module.exports = {
  login: (req, res) => {
    // loginnya bisa pake username atau email , dan harus pake password yang tepat
    console.log("query user", req.query);
    const { username, password, email } = req.query;
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

    //? jika ingin loginnya bisa pake email atau username
    // let sql = `select * from user where (username= ? or email = ? ) and password= ?`;

    // console.log(sql);

    connection.query(sql, [username, hashPass(password)], (err, results) => {
      if (err) {
        console.log("error :", err);
        return res.status(500).send({ message: err.message });
      }
      if (!results.length) {
        return res.status(500).send({ message: "user tidak ditemukan" });
      }

      let dataToken = {
        id: results[0].id,
        role_id: results[0].role_id,
      };
      // enkripsi seperti es batu bisa dibekukan lagi
      // {id:110,role_id:3} <=> '213id0naudnqe91381238hadhabd'
      // pembuatan token
      const tokenAccess = createTokenAccess(dataToken);

      return res.status(200).send({ token: tokenAccess, data: results[0] });
    });
  },
  register: async (req, res) => {
    const { username, password, email } = req.body;
    // initialize for using promisi in mysqljs
    const connDb = connection.promise();
    try {
      // TODO:
      // cek username ada atau enggak
      // kalo ada return status 500 dan kasih message username telah ada
      // kalo tidak ada add data to user table
      // jika berhasil kirim email verifikasi
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
        email,
        password: hashPass(password),
      };
      let [result] = await connDb.query(sql, [dataInsert]);
      console.log(result.insertId); // insertId adalah id yang baru dihasilkan dari insertData
      //? get lagi datanya kayak login
      sql = `select * from user where id = ?`;
      let [dataUserRes] = await connDb.query(sql, [result.insertId]);
      // send response
      let dataToken = {
        id: dataUserRes[0].id,
        role_id: dataUserRes[0].role_id,
      };
      let tokenAccess = createTokenAccess(dataToken);
      let tokenEmailVerified = createTokenEmailVerified(dataToken);
      //?kirim email verifikasi
      let filepath = path.resolve(__dirname, "../template/emailVerif.html");
      // console.log(filepath);
      // ubah html jadi string pake fs.readfile
      let htmlString = fs.readFileSync(filepath, "utf-8");
      const template = handlebars.compile(htmlString);
      const htmlToEmail = template({
        nama: username,
        token: tokenEmailVerified,
      });
      console.log(htmlToEmail);
      // email with tamplate html
      await transporter.sendMail({
        from: "Naruto <dinotestes12@gmail.com>",
        to: email,
        subject: "Email verifikasi dari hokage",
        html: htmlToEmail,
      });

      return res.status(200).send({ token: tokenAccess, data: dataUserRes[0] });
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
  kirimEmail: async (req, res) => {
    try {
      // path file email yang benar
      let filepath = path.resolve(__dirname, "../template/email.html");
      // console.log(filepath);
      // ubah html jadi string pake fs.readfile
      let htmlString = fs.readFileSync(filepath, "utf-8");
      console.log(htmlString);
      console.log("stelah handlebars");
      const template = handlebars.compile(htmlString);
      const htmlToEmail = template({ nama: "dino", text: "pesan dari hokage" });
      console.log(htmlToEmail);
      // email with tamplate html
      let result = await transporter.sendMail({
        from: "Naruto <dinotestes12@gmail.com>",
        to: "dinopwdk@gmail.com",
        subject: "Email dari hokage",
        html: htmlToEmail,
      });
      // let result = await transporter.sendMail({
      //   from: "Naruto <dinotestes12@gmail.com>",
      //   to: "dinopwdk@gmail.com",
      //   subject: "Email dari hokage",
      //   html: "<h1>pesan dari hokage</h1>",
      // });
      // let result = await transporter.sendMail({
      //   from: "Naruto <dinotestes12@gmail.com>",
      //   to: "dinopwdk@gmail.com",
      //   subject: "Email dari hokage text",
      //   text: "pesan dari hokage",
      // });
      console.log(result);
      return res.send({ message: "berhasil kirim email" });
    } catch (error) {
      console.log("error :", error);
      return res.status(500).send({ message: error.message });
    }
  },
  verified: async (req, res) => {
    const { id } = req.user;
    const connDb = connection.promise();
    try {
      let updateData = {
        isVerified: 1,
      };
      let sql = `update user set ? where id = ?`;
      await connDb.query(sql, [updateData, id]);
      sql = `select * from user where id = ?`;
      let [dataUserRes] = await connDb.query(sql, [id]);
      return res.status(200).send(dataUserRes[0]);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).send({ message: error.message });
    }
  },
  sendVerifiedEmail: async (req, res) => {
    const { id_user } = req.params;
    const connDb = connection.promise();
    try {
      // get userdata by id_user
      let sql = `select * from user where id = ?`;
      let [dataUserRes] = await connDb.query(sql, [id_user]);
      let dataToken = {
        id: dataUserRes[0].id,
        role_id: dataUserRes[0].role_id,
      };
      let tokenEmailVerified = createTokenEmailVerified(dataToken);
      //?kirim email verifikasi
      let filepath = path.resolve(__dirname, "../template/emailVerif.html");
      // console.log(filepath);
      // ubah html jadi string pake fs.readfile
      let htmlString = fs.readFileSync(filepath, "utf-8");
      const template = handlebars.compile(htmlString);
      const htmlToEmail = template({
        nama: dataUserRes[0].username,
        token: tokenEmailVerified,
      });
      console.log(htmlToEmail);
      // email with tamplate html
      await transporter.sendMail({
        from: "Naruto <dinotestes12@gmail.com>",
        to: dataUserRes[0].email,
        subject: "Email verifikasi dari hokage",
        html: htmlToEmail,
      });
      return res.status(200).send({ message: "berhasil kirim email verified" });
    } catch (error) {
      console.log("error :", error);
      return res.status(500).send({ message: error.message });
    }
  },
  keepLogin: async (req, res) => {
    // nggak update tokennya
    const { id } = req.user;
    const connDb = connection.promise();
    try {
      let sql = `select * from user where id = ?`;
      let [dataUserRes] = await connDb.query(sql, [id]);
      return res.status(200).send(dataUserRes[0]); // object
    } catch (error) {
      console.log("error :", error);
      return res.status(500).send({ message: error.message });
    }
  },
};
