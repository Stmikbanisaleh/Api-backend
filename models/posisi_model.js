const Sequelize = require('sequelize');
const sequelize = require('../lib/connection');

const posisimodel = sequelize.define('posisi', {
  id_posisi: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nama_web: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
}, {
  freezeTableName: true,
});

// force: true will drop the table if it already exists
posisimodel.sync({ force: false }).then(() => {
// Table created
// return mspaten.create({
//     name: 'admin',
//     password: 'admin',
//     email : 'imamsatrianta@gmail.com'
// });
});
module.exports = posisimodel;
