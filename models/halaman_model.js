const Sequelize = require('sequelize');
const sequelize = require('../lib/connection');

const halamanmodel = sequelize.define('halamanstatis', {
  id_halaman: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  judul: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  judul_seo: {
    type: Sequelize.STRING,
  },
  isi_halaman: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  tgl_posting: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  gambar: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dibaca: {
    type: Sequelize.INTEGER,
  },
  jam: {
    type: Sequelize.TIME,
  },
  hari: {
    type: Sequelize.STRING,
  },
  rekap: {
    type: Sequelize.INTEGER,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});

// force: true will drop the table if it already exists
halamanmodel.sync({ force: false }).then(() => {
// Table created
// return mspaten.create({
//     name: 'admin',
//     password: 'admin',
//     email : 'imamsatrianta@gmail.com'
// });
});
module.exports = halamanmodel;
