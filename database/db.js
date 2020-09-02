const { Sequelize, DataTypes, Model } = require('sequelize');
const { Guitar } = require('./postgres/guitarSchema');
const { Review } = require('./postgres/reviewSchema');

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

/*
 *  Find reviews that match guitar id
 *  TODO: This, and rest of DB methods
 */
const findMatchingReviews = async (id) => {
  try {
    const reviews = await Review.findAll({

    });
  } catch (err) {
    return err;
  }
};

module.exports = {
  sequelize, DataTypes, Model, findGuitar,
};
