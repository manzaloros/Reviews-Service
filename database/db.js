const { Sequelize, DataTypes, Model } = require('sequelize');
const { Guitar } = require('./guitarSchema');

const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  database: 'reviews',
  port: process.env.DB_PORT || 5432,
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true',
  },
  define: {
    timestamps: false,
  },
});

/*
 *  Find guitar
 */
const findGuitar = async (id) => {
  try {
    const guitar = await Guitar.findAll({
      where: {
        id,
      },
    });
    return guitar;
  } catch (err) {
    return err;
  }
};

module.exports = {
  sequelize, DataTypes, Model, findGuitar,
};
