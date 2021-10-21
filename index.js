const express = require("express");
const app = express();

// socket IO set up
const http = require("http");
require("dotenv").config();
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const PORT = 5000;

const { tampilakanHtml } = require("./src/helpers");
const morgan = require("morgan");

morgan.token("date", function (req, res) {
  return new Date();
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :date")
);

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

// socket IO set up
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: "*",
});

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
      .find({})
      // .skip(2)
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
app.delete("/movies/:id", async (req, res) => {
  const collection = client.db("beljc18").collection("movies");
  let { id } = req.params;
  try {
    await collection.deleteMany({ _id: new ObjectId(id) });
    return res.send({ message: "berhasil delete data movies" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

// edit
app.put("/movies/:id", async (req, res) => {
  const collection = client.db("beljc18").collection("movies");
  let { id } = req.params;
  let { title, genres } = req.body; //
  // req.body expect {title:"ubah title",genres:['dasdad']}
  // $unset itu gunanya untuk mengahpus field $unset:{year:''}
  try {
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...req.body } }
    );
    return res.send({ message: "berhasil update data data movies" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

//! aggregate atau get biasa harus ada to array diakhir

app.get("/hitungGenre", async (req, res) => {
  const collection = client.db("beljc18").collection("movies");
  try {
    // menghitung categories di tiap array
    let data = await collection
      .aggregate([
        { $unwind: "$genres" }, // ngitung tiap value yang ada ddalam array
        {
          $group: {
            _id: "$genres",
            totalWins: { $sum: 1 },
          },
        },
        { $sort: { genreCount: -1 } },
      ])
      .toArray();
    // ngitung total win
    // let data = await collection
    // .aggregate([
    //   {
    //     $group: {
    //       _id: null,
    //       totalWins: { $sum: "$awards.wins" },
    //     },
    //   }
    // ])
    // .toArray();
    return res.send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

// io set
let users = 0;
let messages = [];
let messagescnl = [];

app.get("/mess", (req, res) => {
  return res.status(200).send(messages);
});

app.post("/sendmess", (req, res) => {
  const { cnl } = req.query;
  console.log(cnl);
  if (cnl === "/channel") {
    messagescnl.push(req.body);
    console.log(req.body);
    io.of("/channel").emit("pesan", messagescnl);
    return res.status(200).send({ messages: "berhasil kirim message" });
  } else {
    messages.push(req.body);
    // console.log(messages);
    io.emit("pesan", messages);
    return res.status(200).send({ messages: "berhasil kirim message" });
  }
});

// io global connect
io.on("connection", (socket) => {
  console.log("isi socket :", socket.id);
  console.log("a user connected :", users);

  socket.on("bebas", (data) => {
    users++;
    console.log(data.name);

    io.emit("balas", `${data.name} telah join chat `);
  });

  socket.on("putus", () => {
    io.disconnectSockets();
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
    console.log("user disconnected");
    users--;
    console.log("total connected :", users);

    // io.emit("user connected", userCount);
  });
});

io.of("/channel").on("connection", (socket) => {
  console.log("isi socket namespace :", socket.id);
  console.log("a user connected namespace :", users);

  socket.on("bebas", (data) => {
    console.log("di namesapce", data.name);

    io.of("/channel").emit("balas", `${data.name} telah join chat `);
  });

  socket.on("disconnect", (reason) => {
    console.log("user disconnected");
  });
});

app.all("*", (req, res) => {
  return res.status(404).send({ message: "not found" });
});

// 'event emitter'=> 'on emit'

// latihan siang refactor endpoint user

server.listen(PORT, () => console.log("API jalan di PORT " + PORT));
