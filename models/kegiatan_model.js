const Sequelize = require('sequelize');
const sequelize = require('../lib/connection');

const kegiatanmodel = sequelize.define('kegiatan', {
  id_kegiatan: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_posisi: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nama_kegiatan: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tempat: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tanggal: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  gambar: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  freezeTableName: true,
});

// force: true will drop the table if it already exists
kegiatanmodel.sync({ force: false }).then(() => {
// Table created
// return mspaten.create({
//     name: 'admin',
//     password: 'admin',
//     email : 'imamsatrianta@gmail.com'
// });
});
module.exports = kegiatanmodel;
