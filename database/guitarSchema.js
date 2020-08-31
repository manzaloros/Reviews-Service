const { sequelize, DataTypes, Model } = require('./db');

// const { Sequelize, DataTypes, Model } = require('sequelize');

// const sequelize = new Sequelize({
//   host: process.env.DB_HOST || 'localhost',
//   dialect: 'postgres',
//   database: 'reviews',
//   port: process.env.DB_PORT || 5432,
//   dialectOptions: {
//     ssl: process.env.DB_SSL === 'true',
//   },
//   define: {
//     timestamps: false,
//   },
// });

class Guitar extends Model { }

Guitar.init({
  name: {
    type: DataTypes.STRING,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Guitar',
});

module.exports = {
  sequelize,
  Guitar,
};
