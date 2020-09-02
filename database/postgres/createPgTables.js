const { guitarSchema, sequelize } = require('./guitarSchema.js');
const reviewSchema = require('./reviewSchema.js');

/*
 * Drop and create new Guitar and Review tables in reviews database
 */
guitarSchema.sequelize.sync(({ force: true }))
  .then(() => {
    reviewSchema.sequelize.sync({ force: true });
  })
  .finally(() => {
    sequelize.close();
  });
