const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const db = require('./guitarSchema.js');

const copyGuitars = () => new Promise((resolve, reject) => {
  const stmt = `COPY "Guitars"(name, "productId", id)
                 FROM STDIN
                 DELIMITER ','
                 CSV HEADER`;
  db.sequelize.connectionManager.getConnection().then((client) => {
    const stream = client.query(copyFrom(stmt));
    const fileStream = fs.createReadStream('./seedFiles/guitars.csv');
    fileStream.on('error', (err) => {
      client.end();
      reject(err);
    });
    fileStream.pipe(stream);
    stream.on('finish', () => {
      // returns promise
      db.sequelize.connectionManager.disconnect(client);
    });
  });
});

copyGuitars();
