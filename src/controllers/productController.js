const { connection } = require("./../connections");
const { uploader } = require("./../helpers");
const fs = require("fs");
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
    // isi path itu sama dengan parameter pertama function uploader di route
    let path = "/products";
    console.log(req.files);
    console.log(req.body);
    const { image } = req.files; // image karena name di fieldnya image
    // req.body kalo kirim file itu masih json harus kita parse
    const data = JSON.parse(req.body.data);
    // imagepath adalah tempat foto disimpan
    let imagePath = image ? `${path}/${image[0].filename}` : null;
    const { name, price } = data;
    // kalo mau buat proteksi
    if (!name || !price) {
      if (imagePath) {
        // hapus filenya jika error
        fs.unlinkSync("./public" + imagePath);
      }
      return res.status(400).send({ message: "kurang name or price" });
    }

    //? cara mysql2 promise
    // add data product to table products
    let sql = `insert into products set ?`;
    try {
      let dataInsert = {
        name: name,
        price,
        image: imagePath,
      };
      const [results] = await connection.promise().query(sql, dataInsert);
      console.log(results); // resultsnya insert itu object, property insertId lumayan penting
      // get semua data products
      sql = `select * from products `;
      const [productData] = await connection.promise().query(sql);
      return res.status(200).send(productData);
    } catch (err) {
      if (imagePath) {
        // hapus filenya jika error
        fs.unlinkSync("./public" + imagePath);
      }
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
  },
  editProduct: async (req, res) => {
    const { id } = req.params;
    const connDb = connection.promise();
    let path = "/products";
    console.log(req.files);
    console.log(req.body);
    const { image } = req.files;
    const data = JSON.parse(req.body.data);
    // imagepath null bisa disebabkan karena file memang tidak dikirimkan
    let imagePath = image ? `${path}/${image[0].filename}` : null;
    try {
      // cek product by id
      let sql = `select id,image from products where id = ?`;
      let [dataProd] = await connDb.query(sql, [id]);
      if (!dataProd.length) {
        // kalo kosong atau data tidak ada
        return res.status(500).send({ message: "id tidak ditemukan" });
      }
      let dataUpdate = {
        name: data.name,
        price: data.price,
      };
      if (imagePath) {
        // klo imagepath tidak null maka masukkan path foto ke dalam database
        dataUpdate.image = imagePath;
      }
      console.log("DATA UPDATE :", dataUpdate);
      // update product
      sql = `update products set ? where id = ?`;
      await connDb.query(sql, [dataUpdate, id]);
      // kalo berhasil update
      // hapus foto lama
      if (imagePath) {
        // jika imagepath-nya ada
        if (dataProd[0].image) {
          // jika data image di dataprod tidak null/false
          // hapus filenya jika error
          fs.unlinkSync("./public" + dataProd[0].image);
        }
      }
      sql = `select * from products `;
      const [productData] = await connDb.query(sql);
      return res.status(200).send(productData);
    } catch (err) {
      if (imagePath) {
        // hapus filenya jika error
        fs.unlinkSync("./public" + imagePath);
      }
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
      // kalau delete sudah berhasil di sql
      // maka hapus image jika image ada
      if (productData[0].image) {
        // memastikan image ada di path ini dengan existSync
        if (fs.existsSync("./public" + productData[0].image)) {
          // hapus filenya jika error
          fs.unlinkSync("./public" + productData[0].image);
        }
      }
      sql = `select * from products`;
      const [prodData] = await connDb.query(sql);
      return res.status(200).send(prodData);
    } catch (err) {
      console.log("error :", err);
      return res.status(500).send({ message: err.message });
    }
  },
  tesUpload: (req, res) => {
    console.log("isi req file :", req.files); //dapetin data file
    console.log("isi req body :", req.body); // dapetin data text

    return res.status(200).send({
      message: "berhasil upload",
      isireqfile: req.files,
    });
  },
  tesUploadOtherVer: (req, res) => {
    const path = "/tes";
    const uploadFile = uploader(path, "TES").fields([
      { name: "image", maxCount: 3 },
    ]);
    uploadFile(req, res, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Upload picture failed !", error: err.message });
      }
      console.log("isi req file :", req.files);

      return res.status(200).send({
        message: "berhasil upload",
        isireqfile: req.files,
      });
    });
  },
};
