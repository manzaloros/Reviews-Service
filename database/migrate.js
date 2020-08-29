const guitarSchema = require('./guitarSchema.js');
const reviewSchema = require('./reviewSchema.js');

guitarSchema.sequelize.sync(({ force: true }))
  .then(() => {
    reviewSchema.sequelize.sync({ force: true });
  });
