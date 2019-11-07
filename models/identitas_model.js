const Sequelize = require('sequelize');
const sequelize = require('../lib/connection');

const identitasmodel = sequelize.define('identitas', {
  id_identitas: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nama_website: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  satker: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  facebook: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  google: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  twitter: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  rekening: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  no_telp: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  meta_deskripsi: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  meta_keyword: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  favicon: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
},{
    freezeTableName: true,
});

// force: true will drop the table if it already exists
identitasmodel.sync({ force: false }).then(() => {
// Table created
// return mspaten.create({
//     name: 'admin',
//     password: 'admin',
//     email : 'imamsatrianta@gmail.com'
// });
});
module.exports = identitasmodel;
