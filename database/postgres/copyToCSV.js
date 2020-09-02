const copyTo = require('pg-copy-streams').to;
const fs = require('fs');
const db = require('../guitarSchema.js');

/*
 * Copy databases to single CSV file
 */
const copyGuitarsAndReviews = () => new Promise((resolve, reject) => {
  const stmt = `COPY (SELECT
                ("Guitars"."name", "Guitars"."productId",
                "Reviews".rating, "Reviews".author,
                "Reviews".date, "Reviews".description)
                FROM "Guitars"
                JOIN "Reviews" ON
                "Guitars".id = "Reviews"."guitarId")
                TO STDOUT WITH
                (FORMAT csv, HEADER)`;
  db.sequelize.connectionManager.getConnection().then((client) => {
    const stream = client.query(copyTo(stmt));
    const fileStream = fs.createWriteStream('../seedFiles/guitarsAndReviews.csv');
    stream.setEncoding('utf8');
    stream.on('error', (err) => {
      client.end();
      reject(err);
    });
    stream.pipe(fileStream);
    stream.on('end', () => {
      // returns promise
      resolve(db.sequelize.connectionManager.disconnect(client));
    });
  });
});

copyGuitarsAndReviews();
