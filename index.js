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
// ini midlleware untuk nampung data body untuk method post,put,patch
app.use(express.json());
// klo corsnya "cors()" artinya allow semua ip
app.use(cors());
// untuk membuat token masuk kedalam variable req.token
app.use(bearerToken());
//? parse form data berguna untuk upload file /
app.use(express.urlencoded({ extended: false }));
// untuk serving file statis contoh file statis adalah foto akrena dia statis/tidak berubah di kondisi apapun
app.use(express.static("public"));

app.get("/", async (req, res) => {
  // console.log(req.dino, "dari function/middleware sebelumnya");
  let tampilanWelcome = await tampilakanHtml("./index.html");
  return res.status(200).send(tampilanWelcome);
});

const { authRoute, productRoute, userRoute } = require("./src/routes");

app.use("/auth", authRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);

const { MongoClient, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://dino9611:pwdk123@cluster0.ydv5x.mongodb.net/beljc18?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client
  .connect()
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log(err);
  });

// initial data
app.get("/initData", async (req, res) => {
  const collection = client.db("beljc18").collection("movies");
  await collection.insertMany([
    {
      title: "Titanic",
      year: 1997,
      genres: ["Drama", "Romance"],
      rated: "PG-13",
      languages: [
        "English",
        "French",
        "German",
        "Swedish",
        "Italian",
        "Russian",
      ],
      released: new Date("1997-12-19T00:00:00.000Z"),
      awards: {
        wins: 127,
        nominations: 63,
        text: "Won 11 Oscars. Another 116 wins & 63 nominations.",
      },
      cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane", "Kathy Bates"],
      directors: ["James Cameron"],
    },
    {
      title: "The Dark Knight",
      year: 2008,
      genres: ["Action", "Crime", "Drama"],
      rated: "PG-13",
      languages: ["English", "Mandarin"],
      released: new Date("2008-07-18T00:00:00.000Z"),
      awards: {
        wins: 144,
        nominations: 106,
        text: "Won 2 Oscars. Another 142 wins & 106 nominations.",
      },
      cast: [
        "Christian Bale",
        "Heath Ledger",
        "Aaron Eckhart",
        "Michael Caine",
      ],
      directors: ["Christopher Nolan"],
    },
    {
      title: "Spirited Away",
      year: 2001,
      genres: ["Animation", "Adventure", "Family"],
      rated: "PG",
      languages: ["Japanese"],
      released: new Date("2003-03-28T00:00:00.000Z"),
      awards: {
        wins: 52,
        nominations: 22,
        text: "Won 1 Oscar. Another 51 wins & 22 nominations.",
      },
      cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Takashi Naitè"],
      directors: ["Hayao Miyazaki"],
    },
    {
      title: "Casablanca",
      genres: ["Drama", "Romance", "War"],
      rated: "PG",
      cast: [
        "Humphrey Bogart",
        "Ingrid Bergman",
        "Paul Henreid",
        "Claude Rains",
      ],
      languages: ["English", "French", "German", "Italian"],
      released: new Date("1943-01-23T00:00:00.000Z"),
      directors: ["Michael Curtiz"],
      awards: {
        wins: 9,
        nominations: 6,
        text: "Won 3 Oscars. Another 6 wins & 6 nominations.",
      },
      lastupdated: "2015-09-04 00:22:54.600000000",
      year: 1942,
    },
  ]);

  return res.status(200).send({ message: "berhasil insert" });
});

app.post("/movies", async (req, res) => {
  const collection = client.db("beljc18").collection("movies");
  if (Array.isArray(req.body.data)) {
    // array.isArray ngecek apakah req.body.data itu array
    let data = req.body.data;
    // insert many untuk insert
    try {
      await collection.insertMany([...data]); // [...data] -> []
      return res.send({ message: "berhasil add data movies" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: error.message });
    }
  } else {
    return res.status(400).send("bad request : type data requset harus array");
  }
});

app.get("/movies", async (req, res) => {
  const collection = client.db("beljc18").collection("movies");
  try {
    const moviesData = await collection
      .find({}, { projection: { title: 1, genres: 1, year: 1 } })
      .skip(2)
      .toArray();
    console.log(moviesData);
    return res.status(200).send(moviesData);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

app.get("/search/movies", async (req, res) => {
  // req.query
  const { title } = req.query;
  const query = {};
  if (title) {
    query.title = new RegExp(`${title}`, "i");
  }
  // looping isi req.query
  // for (const key in req.query) {
  //   if (Object.hasOwnProperty.call(req.query, key)) {
  //     const element = req.query[key];
  //     query[key] = element;
  //   }
  // }
  console.log(query);
  const collection = client.db("beljc18").collection("movies");
  try {
    // select * from where title like %title%
    // const moviesData = await collection.find(query).toArray();

    // select title from where title like %title%
    const moviesData = await collection
      .find(query, { projection: { title: 1 } })
      .collation({ locale: "en" }) // biar sortingya tidak case sensitive
      .sort({ title: -1 }) // sorting desc
      .toArray();
    console.log(moviesData);
    return res.status(200).send(moviesData);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

// delete
// edit

app.all("*", (req, res) => {
  return res.status(404).send({ message: "not found" });
});

// latihan siang refactor endpoint user

app.listen(PORT, () => console.log("API jalan di PORT " + PORT));
