const copyTo = require('pg-copy-streams').to;
const fs = require('fs');
const path = require('path');
const db = require('../guitarSchema.js');

/*
 * Copy Postgres databases to single CSV file
 */
const copyGuitarsAndReviews = () => new Promise((resolve, reject) => {
  const stmt = `COPY (SELECT
                "Reviews".id, "Guitars"."productId",
                "Reviews".author, "Reviews".date,
                "Reviews".description, "Guitars"."name",
                "Reviews".rating
                FROM "Guitars"
                JOIN "Reviews" ON
                "Guitars".id = "Reviews"."guitarId")
                TO STDOUT DELIMITER ',' CSV HEADER`;
  db.sequelize.connectionManager.getConnection().then((client) => {
    const stream = client.query(copyTo(stmt));
    const fileStream = fs.createWriteStream(path.join(__dirname, '..', 'seedFiles', 'guitarsAndReviews.csv'));
    // stream.setEncoding('utf8');
    stream.on('error', (err) => {
      client.end();
      reject(err);
    });
    stream.pipe(fileStream);
    stream.on('end', () => {
      console.log('CSV copy complete!');
      // returns promise
      resolve(db.sequelize.connectionManager.disconnect(client));
    });
  });
});

copyGuitarsAndReviews();
