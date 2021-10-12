// export func
module.exports = (tanggal) => {
  let date = tanggal ? new Date(tanggal) : new Date();
  let hari = date.getDay();
  if ([0, 6].includes(hari)) {
    return true;
  } else {
    return false;
  }
};
