const { connection } = require("./../connections");

module.exports = {
  getUsers: async (req, res) => {
    // ? cara mysql2 dengan promise
    let sql = `select * from user `;
    let connMysql = connection.promise();
    try {
      let [results] = await connMysql.query(sql); // connmysql.query itu hasil promisnya adalah array dimana array 1 adlah result ,array 2 itu field
      console.log(results);
      return res.status(200).send(results);
    } catch (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
  },
  addUser: async (req, res) => {
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
  },
  editUser: (req, res) => {
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
  },
  deleteUser: (req, res) => {
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
  },
};
