const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'postgres',
  database: 'reviews',
  define: {
    timestamps: false,
  },
});

class Review extends Model { }

Review.init({
  guitarId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    model: 'Guitars',
    key: 'id',
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  author: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Review',
});

module.exports = {
  sequelize,
  Review,
};
