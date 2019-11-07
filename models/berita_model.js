const Sequelize = require('sequelize');
const sequelize = require('../lib/connection');

const beritamodel = sequelize.define('berita', {
  id_berita: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_posisi: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_bidang: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  judul: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sub_judul: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  youtube: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  judul_seo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  headline: {
    type: Sequelize.ENUM('Y', 'N'),
    allowNull: true,
  },
  aktif: {
    type: Sequelize.ENUM('Y', 'N'),
    allowNull: true,
  },
  utama: {
    type: Sequelize.ENUM('Y', 'N'),
    allowNull: true,
  },
  isi_berita: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  keterangan_gambar: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  hari: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  tanggal: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  jam: {
    type: Sequelize.TIME,
    allowNull: true,
  },
  gambar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
},{
    freezeTableName: true,
});

// force: true will drop the table if it already exists
beritamodel.sync({ force: false }).then(() => {
// Table created
// return mspaten.create({
//     name: 'admin',
//     password: 'admin',
//     email : 'imamsatrianta@gmail.com'
// });
});
module.exports = beritamodel;
