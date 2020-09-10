const { Sequelize, DataTypes, Model } = require('sequelize');
const { Guitar } = require('./postgres/guitarSchema');
const { Review } = require('./postgres/reviewSchema');
const {
  pgHost, pgPort, pgUsername, pgPassword,
} = require('../config');

const sequelize = new Sequelize({
  host: pgHost,
  username: pgUsername,
  password: pgPassword,
  dialect: 'postgres',
  database: 'reviews',
  port: pgPort,
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true',
  },
  define: {
    timestamps: false,
  },
});

/*
 *  Find a single guitar given an id
 */
const findGuitar = async (id) => {
  let guitar;
  try {
    guitar = await Guitar.findAll({
      where: {
        id,
      },
    });
  } catch (error) {
    return error;
  }
  if (guitar.length) {
    return guitar;
  }
};

/*
 *  Find reviews that match guitar id
 */
const findMatchingReviews = async (guitarId) => {
  let reviews;
  try {
    reviews = await Review.findAll({
      where: {
        guitarId,
      },
    });
  } catch (err) {
    return err;
  }
  if (reviews.length) {
    return reviews;
  }
};

// /*
//  *   Add a guitar to the database
//  */
// const insertGuitar = async ({ name, productId }) => {
//   try {
//     const result = await Guitar.create({
//       name, productId,
//     });
//     return result;
//   } catch (err) {
//     return err;
//   }
// };

module.exports = {
  sequelize, DataTypes, Model, findGuitar, findMatchingReviews,
};
