"use strict";
const { connection } = require("./../connections");
const { hashPass, createToken } = require("./../helpers");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const { createTokenAccess, createTokenEmailVerified } = createToken;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dinotestes12@gmail.com", //email
    pass: "schtfqtxjljngnng", // password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  login: (req, res) => {
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

      return res.status(200).send({ token: tokenAccess, data: results });
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
      console.log(result.insertId);

      //?kirim email verifikasi
      let filepath = path.resolve(__dirname, "../template/emailVerif.html");
      // console.log(filepath);
      // ubah html jadi string pake fs.readfile
      let htmlString = fs.readFileSync(filepath, "utf-8");
      const template = handlebars.compile(htmlString);
      const htmlToEmail = template({ nama: username, userID: result.insertId });
      console.log(htmlToEmail);
      // email with tamplate html
      await transporter.sendMail({
        from: "Naruto <dinotestes12@gmail.com>",
        to: email,
        subject: "Email verifikasi dari hokage",
        html: htmlToEmail,
      });

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
};
