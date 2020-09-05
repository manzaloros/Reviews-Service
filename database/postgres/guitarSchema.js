const { Sequelize, DataTypes, Model } = require('sequelize');
const { pgHost, pgUsername, pgPort } = require('../../config');

const sequelize = new Sequelize({
  host: pgHost,
  dialect: 'postgres',
  username: pgUsername,
  database: 'reviews',
  port: pgPort,
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true',
  },
  define: {
    timestamps: false,
  },
});

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
