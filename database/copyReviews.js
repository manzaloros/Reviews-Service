const db = require('./guitarSchema.js');

(async () => {
  const query = `COPY "Guitars"(name, productId, _id)
                FROM './seedFiles/guitars.csv'
                DELIMITER ','
                CSV HEADER`;
  try {
    const [results] = await db.sequelize.query(query);
    return results;
  } catch (e) {
    return console.log(e);
  }
})();
