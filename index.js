const express = require("express");
const app = express();
const PORT = 5000;
const { tampilakanHtml } = require("./helpers");

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
    name: "tes1",
    keterangan: "abce",
  },
  {
    id: 2,
    name: "tes2",
    keterangan: "abce",
  },
];
let id = 2;
const loggingFunc = (req, res, next) => {
  console.log(req.method, req.url, new Date().toString());
  // nambah property dino di object req
  req.dino = "namaku";
  next();
};

// middleware global start
app.use(express.json());
app.use(loggingFunc);
// ini midlleware untuk nampung data body untuk method post,put,patch

// middleware end
// middleware bisa ditengah endpoint ini atau di app.use agar menjadi middleware global
// app.get("/", loggingFunc,async (req, res) => {
//   console.log(req.dino, "dari function sebelumnya");
//   let tampilanWelcome = await tampilakanHtml("./index.html");
//   return res.status(200).send(tampilanWelcome);
// });

app.get("/", async (req, res) => {
  console.log(req.dino, "dari function sebelumnya");
  let tampilanWelcome = await tampilakanHtml("./index.html");
  return res.status(200).send(tampilanWelcome);
});

app.get("/products", (req, res) => {
  console.log(req.dino, "dari function sebelumnya");
  return res.status(200).send(products);
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
