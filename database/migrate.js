const guitarSchema = require('./guitarSchema.js');
const reviewSchema = require('./reviewSchema.js');

guitarSchema.sequelize.sync({ force: true });
reviewSchema.sequelize.sync();
