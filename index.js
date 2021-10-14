const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const PORT = 5000;
const { tampilakanHtml } = require("./src/helpers");
const morgan = require("morgan");

morgan.token("date", function (req, res) {
  return new Date();
});

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log"),
//   {
//     flags: "a",
//   }
// );

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :date"
    // { stream: accessLogStream }
  )
);

// app.use(morgan('common', {
//   stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// }))
// nasi menjadi bubur

// 'ddasdad' => '213id0naudnqe91381238hadhabd'
// enkripsi seperti es batu bisa dibekukan lagi
// {id:110,role_id:3} <=> '213id0naudnqe91381238hadhabd'

// middleware global start
app.use(express.json());
app.use(cors()); // klo corsnya "cors()" artinya allow semua ip
// untuk membuat token masuk kedalam variable req.token
app.use(bearerToken());

// ini midlleware untuk nampung data body untuk method post,put,patch

app.get("/", async (req, res) => {
  // console.log(req.dino, "dari function/middleware sebelumnya");
  let tampilanWelcome = await tampilakanHtml("./index.html");
  return res.status(200).send(tampilanWelcome);
});

const { authRoute, productRoute, userRoute } = require("./src/routes");

app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);

app.all("*", (req, res) => {
  return res.status(404).send({ message: "not found" });
});

// latihan siang refactor endpoint user

app.listen(PORT, () => console.log("API jalan di PORT " + PORT));
