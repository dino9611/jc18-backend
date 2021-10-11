const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = 5000;
const { tampilakanHtml } = require("./helpers");
const mysql = require("mysql");

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
// data users anggap aja database
let users = [
  {
    id: 1,
    username: "tes",
    password: "abce",
  },
  {
    id: 2,
    username: "tes",
    password: "abce",
  },
];
// data products anggap aja database
let products = [
  {
    id: 1,
    name: "papan kayu",
    price: 20000,
  },
  {
    id: 2,
    name: "kursi kayu",
    price: 200000,
  },
  {
    id: 3,
    name: "lemari kece",
    price: 50000,
  },
  {
    id: 4,
    name: "jendela bagus",
    price: 100000,
  },
];

let id = 4;

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

app.get("/products", (req, res) => {
  // console.log(req.dino, "dari function sebelumnya");
  // console.log("63 req.query products", req.query);
  const { namaProd, hargaMin, hargaMax } = req.query;
  let newFilterProd = products;

  if (namaProd) {
    // jika nameProd ada isinya filter
    newFilterProd = newFilterProd.filter((val) =>
      val.name.toLowerCase().includes(namaProd.toLowerCase())
    );
  }
  if (hargaMin) {
    // jika hargamin ada isinya filter
    newFilterProd = newFilterProd.filter((val) => val.price >= hargaMin);
  }
  if (hargaMax) {
    // jika hargamax ada isinya filter
    newFilterProd = newFilterProd.filter((val) => val.price <= hargaMax);
  }
  // jika semua querynya false pasti tidak difilter artinya newfilterprod tidak ada perubahan
  // newFilterProd adalah array of object
  return res.status(200).send(newFilterProd);
});

app.get("/users", (req, res) => {
  console.log("query user", req.query);
  return res.status(200).send(users);
});

app.post("/products", (req, res) => {
  console.log(req.body);
  let data = req.body;
  data.id = ++id;
  // push data to database
  products.push(data);
  return res.status(200).send(products);
});
// edit
app.patch("/products/:id", (req, res) => {
  const { id } = req.params;
  // cari index
  let indexEdit = products.findIndex((val) => val.id == id);

  if (indexEdit >= 0) {
    // edit data
    const { name, price } = req.body;
    if (name) {
      // jika name ada
      products[indexEdit].name = name;
    }
    if (price) {
      // jika price ada
      products[indexEdit].price = price;
    }
    return res.status(200).send(products);
  } else {
    let obj = {
      message: "tidak ada id",
    };
    return res.status(400).send(obj);
  }
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

app.listen(PORT, () => console.log("API jalan di PORT " + PORT));
