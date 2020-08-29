const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  database: 'reviews',
});

class Guitar extends Model { }

Guitar.init({
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Guitar',
});

// (async () => {
//   await Guitar.sync();
//   console.log("Table for the Guitar model was just created!");
// })();

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// })();

module.exports = {
  sequelize,
  Guitar,
};
