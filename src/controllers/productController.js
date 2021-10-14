const { connection } = require("./../connections");

module.exports = {
  getProducts: async (req, res) => {
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
    // try {
    //   let sql = `select * from products ${querySql} limit ?,? `;
    //   console.log(sql);
    //   const [dataProduct] = await connDb.query(sql, [offset, parseInt(limit)]);
    //   sql = `select count(*) as total_data from products ${querySql}`;
    //   const [totalData] = await connDb.query(sql);
    //   // hasil dari sql akan selalu menghasilkan array of object
    //   // hasilnya harus menyertakan total dan, pages berapa
    //   return res.status(200).send({
    //     pages: parseInt(pages),
    //     total: totalData[0].total_data,
    //     data: dataProduct,
    //   });
    // } catch (error) {
    //   console.log("error :", error);
    //   return res.status(500).send({ message: error.message });
    // }

    try {
      let sql = `select * from products`;
      const [dataProduct] = await connDb.query(sql);
      // let newProd = dataProduct.map((val) => ({
      //   ...val,
      //   name: val.name + "dino",
      // }));
      return res.status(200).send(dataProduct);
    } catch (error) {
      console.log("error :", error);
      return res.status(500).send({ message: error.message });
    }

    // jika semua querynya false pasti tidak difilter artinya newfilterprod tidak ada perubahan
    // newFilterProd adalah array of object
  },
  addProducts: async (req, res) => {
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
      const [productData] = await connection.promise().query(sql);
      return res.status(200).send(productData);
    } catch (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
  },
  editProduct: async (req, res) => {
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
      const [productData] = await connDb.query(sql);
      return res.status(200).send(productData);
    } catch (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
  },
  getProductById: async (req, res) => {
    console.log("codingan di controller", req.user);
    const { id } = req.params;
    const connDb = connection.promise();
    try {
      let sql = `select * from products where id = ?`;
      const [productData] = await connDb.query(sql, [id]);
      return res.status(200).send(productData[0]);
    } catch (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    let id = req.params.id;
    const connDb = connection.promise();
    try {
      let sql = `select * from products where id = ?`;
      const [productData] = await connDb.query(sql, [id]);
      if (!productData.length) {
        throw { message: "id tidak ditemukan" };
      }
      sql = `delete from products where id = ?`;
      await connDb.query(sql, [id]);
      sql = `select * from products`;
      const [prodData] = await connDb.query(sql);
      return res.status(200).send(prodData);
    } catch (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
  },
};
