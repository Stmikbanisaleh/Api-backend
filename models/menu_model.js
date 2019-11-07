const Sequelize = require('sequelize');
const sequelize = require('../lib/connection');

const menumodel = sequelize.define('menu', {
  id_menu: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  id_posisi: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  id_parent: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nama_menu: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  punya_sub: {
    type: Sequelize.ENUM('Ya', 'Tidak'),
    allowNull: false,
  },
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status_aktif: {
    type: Sequelize.ENUM('Ya', 'Tidak'),
    allowNull: false,
  },
  urutan: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
},{
    freezeTableName: true,
});

// force: true will drop the table if it already exists
menumodel.sync({ force: false }).then(() => {
// Table created
// return mspaten.create({
//     name: 'admin',
//     password: 'admin',
//     email : 'imamsatrianta@gmail.com'
// });
});
module.exports = menumodel;
