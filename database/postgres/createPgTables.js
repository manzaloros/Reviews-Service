const { Guitar, sequelize } = require('./guitarSchema.js');
const { Review } = require('./reviewSchema.js');

/*
 * Drop and create new Guitar and Review tables in reviews database
 */
Guitar.sequelize.sync(({ force: true }))
  .then(() => {
    Review.sequelize.sync({ force: true });
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    sequelize.close();
  });
