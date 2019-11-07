const Sequelize = require('sequelize');
const sequelize = require('../lib/connection');

const sopmodel = sequelize.define('sop', {
  id_sop: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  judul: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nama_judul: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nama_file: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tgl_posting: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  hits: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
},{
    freezeTableName: true,
});

// force: true will drop the table if it already exists
sopmodel.sync({ force: false }).then(() => {
// Table created
// return mspaten.create({
//     name: 'admin',
//     password: 'admin',
//     email : 'imamsatrianta@gmail.com'
// });
});
module.exports = sopmodel;
