const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = 5000;
const { tampilakanHtml } = require("./src/helpers");
// const mysql = require("mysql");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "bejc18",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});
// cara promisify
// const { promisify } = require("util");
// const connDb = promisify(connection.query).bind(connection);

const loggingFunc = (req, res, next) => {
  console.log(req.method, req.url, new Date().toString());
  // nambah property dino di object req
  // req.dino = "namaku";

  next();
};

//? cara manual
// const cors = (req, res, next) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   res.set("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE,PATCH");
//   res.set("Access-Control-Allow-Headers", "content-type");
//   next();
// };

// middleware global start
app.use(express.json());
app.use(loggingFunc);
app.use(cors()); // klo corsnya "cors()" artinya allow semua ip
// ini midlleware untuk nampung data body untuk method post,put,patch

// middleware end
// middleware bisa ditengah endpoint ini atau di app.use agar menjadi middleware global
// app.get("/", loggingFunc,async (req, res) => {
//   console.log(req.dino, "dari function sebelumnya");
//   let tampilanWelcome = await tampilakanHtml("./index.html");
//   return res.status(200).send(tampilanWelcome);
// });

// method PUT,PATCH,POST punya req.query,req.params,req.body
// method GET req.query,req.params

app.get("/", async (req, res) => {
  // console.log(req.dino, "dari function/middleware sebelumnya");
  let tampilanWelcome = await tampilakanHtml("./index.html");
  return res.status(200).send(tampilanWelcome);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  let indexProd = products.findIndex((val) => val.id == id);
  return res.status(200).send(products[indexProd]);
});

app.get("/products", async (req, res) => {
  // pages=1 dan limit=2 default value jika req.query tidak ada
  const { namaProd, hargaMin, hargaMax, pages = 1, limit = 2 } = req.query;
  // console.log(req.query);
  // console.log(limit);
  // offset mulai dari row berapa di sql jika offset 0 maka row 1 sebanyak "limit" akan diambil ,
  // jika offset 10 maka row 11 sebanyak "limit" akan diambil
  let offset = (pages - 1) * limit;
  let querySql = ` where true`;
  const connDb = connection.promise();
  if (namaProd) {
    // jika nameProd ada isinya filter
    querySql += ` and name like ${connection.escape("%" + namaProd + "%")}`;
  }
  if (hargaMin) {
    // jika hargamin ada isinya filter
    querySql += ` and price >= ${connection.escape(parseInt(hargaMin))}`;
  }
  if (hargaMax) {
    // jika hargamax ada isinya filter
    querySql += ` and price <= ${connection.escape(parseInt(hargaMax))}`;
  }
  try {
    let sql = `select * from products ${querySql} limit ?,? `;
    console.log(sql);
    const [dataProduct] = await connDb.query(sql, [offset, parseInt(limit)]);
    sql = `select count(*) as total_data from products ${querySql}`;
    const [totalData] = await connDb.query(sql);
    // hasil dari sql akan selalu menghasilkan array of object
    // hasilnya harus menyertakan total dan, pages berapa
    return res.status(200).send({
      pages: parseInt(pages),
      total: totalData[0].total_data,
      data: dataProduct,
    });
  } catch (error) {
    console.log("error :", error);
    return res.status(500).send({ message: error.message });
  }

  // try {
  //   let sql = `select * from products`;
  //   const [dataProduct] = await connDb.query(sql);
  //   return res.status(200).send({
  //     data: dataProduct,
  //   });
  // } catch (error) {
  //   console.log("error :", error);
  //   return res.status(500).send({ message: error.message });
  // }

  // jika semua querynya false pasti tidak difilter artinya newfilterprod tidak ada perubahan
  // newFilterProd adalah array of object
});

app.get("/login", (req, res) => {
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

  connection.query(sql, [username, password], (err, results) => {
    if (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
    return res.status(200).send(results);
  });
});

// buat siang
// coba buat endpoint register,cek usernya dulu ada atau enggak, kalau berhasil langsung otomatis login.

// add users
app.post("/users", async (req, res) => {
  console.log(req.body);
  const { username, password, alamat } = req.body;
  // kalo mau buat proteksi
  if (!username || !password || !alamat) {
    return res.status(400).send({ message: "kurang username or pass" });
  }
  //? cara mysql2 promise
  let sql = `insert into user set ?`;
  try {
    let dataInsert = {
      username: username,
      password,
      address: alamat,
    };
    const [results] = await connection.promise().query(sql, dataInsert);
    console.log(results); // resultsnya insert itu object, property insertId lumayan penting
    sql = `select * from user `;
    const [userData] = await connection.promise().query(sql);
    return res.status(200).send(userData);
  } catch (error) {
    console.log("error :", err);
    return res.status(500).send({ message: err.message });
  }

  // ? cara pake mysql1
  // let sql = `insert into user set ?`;
  // let dataInsert = {
  //   username: username,
  //   password,
  //   address: alamat,
  // };
  // connection.query(sql, dataInsert, (err, results) => {
  //   if (err) {
  //     console.log("error :", err);
  //     return res.status(500).send({ message: err.message });
  //   }
  //   console.log(results); // resultsnya insert itu object, property insertId lumayan penting
  //   // get data lagi
  //   sql = `select * from user `;
  //   connection.query(sql, (err, userData) => {
  //     if (err) {
  //       console.log("error :", err);
  //       return res.status(500).send({ message: err.message });
  //     }
  //     // console.log('lewat 102') bisa digunakan untuk cek error
  //     // console.log("results :", results); // selalu array of object
  //     return res.status(200).send(userData);
  //   });
  // });
});
// sql transaction ??
app.delete("/users/:iduser", (req, res) => {
  const { iduser } = req.params;

  let sql = `select id from user where id = ?`;
  connection.query(sql, [iduser], (err, results1) => {
    if (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
    if (!results1.length) {
      //kalo length false/0 maka masuk sini
      return res.status(500).send({ message: "id tidak ditemukan" });
    }
    sql = `delete from user where id = ?`;
    connection.query(sql, [iduser], (err, results) => {
      if (err) {
        console.log("error :", err);
        return res.status(500).send({ message: err.message });
      }
      // data udah pasti terhapus kalo console.log(results) terbaca
      console.log(results);
      // get data ulang
      sql = `select * from user `;
      connection.query(sql, (err, userData) => {
        if (err) {
          console.log("error :", err);
          return res.status(500).send({ message: err.message });
        }
        // console.log('lewat 102') bisa digunakan untuk cek error
        // console.log("results :", results); // selalu array of object
        return res.status(200).send(userData);
      });
    });
  });
});

app.put("/users/:iduser", (req, res) => {
  const { username, password, address } = req.body; // isinya object
  const { iduser } = req.params;
  // ambil data berdasarkan id ada atau tidak
  let sql = `select id from user where id = ?`;
  connection.query(sql, [iduser], (err, results1) => {
    if (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
    if (!results1.length) {
      // kalo data dengan id yang diinput tidak ada maka masuk sini
      //kalo length false/0 maka masuk sini
      return res.status(500).send({ message: "id tidak ditemukan" });
    }
    // property objectnya harus sama dengan table sqlnya
    let dataUpdate = {
      username,
      password,
      address,
    };
    // edit query
    sql = `update user set ? where id = ?`;
    // sql = `update user set username = ${connection.escape(username)}, password = ? where id = ?`;
    connection.query(sql, [dataUpdate, iduser], (err, results) => {
      if (err) {
        console.log("error :", err);
        return res.status(500).send({ message: err.message });
      }
      // data udah pasti teredit kalo console.log(results) terbaca
      console.log(results);
      // get data ulang
      sql = `select * from user `;
      connection.query(sql, (err, userData) => {
        if (err) {
          console.log("error :", err);
          return res.status(500).send({ message: err.message });
        }
        return res.status(200).send(userData);
      });
    });
  });
});

app.get("/users", async (req, res) => {
  // ? cara mysql2 dengan promise
  let sql = `select * from user  `;
  let connMysql = connection.promise();
  try {
    let [results] = await connMysql.query(sql); // connmysql.query itu hasil promisnya adalah array dimana array 1 adlah result ,array 2 itu field
    console.log(results);
    return res.status(200).send(results);
  } catch (err) {
    console.log("error :", err);
    return res.status(500).send({ message: err.message });
  }

  // ?cara promise promisify

  // let sql = `select * from user `;
  // try {
  //   let results = await connDb(sql);
  //   console.log(results);
  //   return res.status(200).send(results);
  // } catch (error) {
  //   console.log("error :", err);
  //   return res.status(500).send({ message: err.message });
  // }
  // cara callback dengan mysql1
  // console.log("query user", req.query);
  // let sql = `select * from user `;
  // connection.query(sql, (err, results) => {
  //   if (err) {
  //     console.log("error :", err);
  //     return res.status(500).send({ message: err.message });
  //   }
  //   // console.log('lewat 102') bisa digunakan untuk cek error
  //   // console.log("results :", results); // selalu array of object
  //   return res.status(200).send(results);
  // });
});

app.post("/products", async (req, res) => {
  console.log(req.body);
  const { name, price } = req.body;
  // kalo mau buat proteksi
  if (!name || !price) {
    return res.status(400).send({ message: "kurang name or price" });
  }
  //? cara mysql2 promise
  // add data product to table products
  let sql = `insert into products set ?`;
  try {
    let dataInsert = {
      name: name,
      price,
    };
    const [results] = await connection.promise().query(sql, dataInsert);
    console.log(results); // resultsnya insert itu object, property insertId lumayan penting
    // get semua data products
    sql = `select * from products `;
    const [userData] = await connection.promise().query(sql);
    return res.status(200).send(userData);
  } catch (err) {
    console.log("error :", err);
    return res.status(500).send({ message: err.message });
  }
});
// edit
app.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const connDb = connection.promise();

  try {
    // cek product by id
    let sql = `select id from products where id = ?`;
    let [dataProd] = await connDb.query(sql, [id]);
    if (!dataProd.length) {
      // kalo kosong atau data tidak ada
      return res.status(500).send({ message: "id tidak ditemukan" });
    }
    let dataUpdate = req.body;

    console.log("DATA UPDATE :", dataUpdate);
    // update product
    sql = `update products set ? where id = ?`;
    await connDb.query(sql, [dataUpdate, id]);
    sql = `select * from products `;
    const [userData] = await connDb.query(sql);
    return res.status(200).send(userData);
  } catch (err) {
    console.log("error :", err);
    return res.status(500).send({ message: err.message });
  }

  // return res.status(400).send(obj);
});

app.delete("/products/:id", (req, res) => {
  let id = req.params.id;
  // cari index
  let indexDelete = products.findIndex((val) => val.id == id);

  if (indexDelete >= 0) {
    // delete data in array
    products.splice(indexDelete, 1);
    return res.status(200).send(products);
  } else {
    let obj = {
      message: "tidak ada id",
    };
    return res.status(400).send(obj);
  }
});

app.post("/auth/register", async (req, res) => {
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
      password,
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
});

app.listen(PORT, () => console.log("API jalan di PORT " + PORT));
