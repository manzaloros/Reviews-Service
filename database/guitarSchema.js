const { Sequelize, DataTypes, Model } = require('sequelize');

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
