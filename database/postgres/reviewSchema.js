const { Sequelize, DataTypes, Model } = require('sequelize');
const {
  pgHost, pgUsername, pgPassword, pgPort,
} = require('../../config');

const sequelize = new Sequelize({
  host: pgHost,
  dialect: 'postgres',
  username: pgUsername,
  password: pgPassword,
  database: 'reviews',
  port: pgPort,
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
    type: DataTypes.STRING(1234),
  },
}, {
  indexes: [{
    name: 'guitarId_index',
    using: 'BTREE',
    fields: ['guitarId'],
  },
  ],
  sequelize,
  modelName: 'Review',
});

module.exports = {
  sequelize,
  Review,
};
