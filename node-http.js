// ? http
var users = [
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
var products = [
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
const http = require("http");
const { createReadStream, readFile } = require("fs");
const url = require("url");
const querystring = require("querystring");

const tampilakanHtml = (pathtoFile) => {
  return new Promise((resolve, reject) => {
    readFile(pathtoFile, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const server = http.createServer((req, res) => {
  //proses mengubah data bahasa pemrograman menjadi json disebut serialisasi
  //? url
  // http://localhost:5000/products?namaProd=popok&hargamin=20000
  const myurl = url.parse(req.url);
  // ? /products url pathname
  console.log(myurl.pathname);
  //? namaProd=popok&hargamin=20000
  console.log(myurl.query);
  //? hasil qs { namaProd: 'popok', hargamin: '20000' }
  console.log(querystring.parse(myurl.query)); // query menjadi object
  // console.log(req);
  // izin akses dari luar
  res.setHeader("Access-Control-Allow-Origin", "*");
  // izin method yang digunakan
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,POST,PUT,DELETE,PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "content-type");

  if (myurl.pathname === "/products" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else if (myurl.pathname === "/users" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else if (myurl.pathname === "/text" && req.method === "GET") {
    // header untuk bikin link download
    res.writeHead(200, {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "attachment; filename=download.txt",
    });
    let readStream = createReadStream("./text/test.txt");
    // readStream.on("open", () => {
    //   console.log(data);
    //   readStream.pipe(res);
    // });
    readStream.on("data", (data) => {
      console.log(data);
      readStream.pipe(res);
    });
    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on("error", function (err) {
      res.end(err);
    });
  } else if (myurl.pathname === "/products" && req.method === "POST") {
    // req. on data berfungsi sebagai event dimana memiliki callback yang membawa data
    req.on("data", (body) => {
      // body adalah data yang dikirimkan
      console.log(body);
      // deserialasi
      let data = JSON.parse(body);
      data.id = ++id;
      console.log("hasil parsing", data);
      // push data to database
      products.push(data);
      res.writeHead(200, { "Content-type": "application/json" });
      // send all data product to response
      res.end(JSON.stringify(products));
    });
  } else if (myurl.pathname.includes("/products") && req.method === "DELETE") {
    // cari param
    let paramProd = myurl.pathname.split("/")[2]; //id
    // cari index
    let indexdelete = products.findIndex((val) => val.id == paramProd);
    res.writeHead(200, { "Content-type": "application/json" });
    if (indexdelete >= 0) {
      // delete data in array
      products.splice(indexdelete, 1);
      res.end(JSON.stringify(products));
    } else {
      let obj = {
        message: "tidak ada id",
      };
      res.end(JSON.stringify(obj));
    }
  } else if (myurl.pathname === "/") {
    tampilakanHtml("./index.html")
      .then((datahtml) => {
        res.writeHead(200, { "Content-type": "text/html" });
        console.log(datahtml);
        res.end(datahtml);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });

    res.end("not found");
  }
});

server.listen(5000, () => console.log("Server jalan di port 5000"));
