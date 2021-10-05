const { readFile } = require("fs");

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

module.exports = tampilakanHtml;
