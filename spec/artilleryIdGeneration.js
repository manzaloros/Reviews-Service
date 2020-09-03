const fs = require('fs');
const path = require('path');
const faker = require('faker');

const writeStream = fs.createWriteStream(path.resolve(__dirname, 'artilleryIds.csv'));
const generateFakeIds = (l, writer) => {
  let i = l;
  const write = () => {
    let ok = true;
    do {
      const randomId = String(faker.random.number({ min: 1, max: 1e7 }));
      i -= 1;
      if (i === 0) {
        writer.write(`${randomId}`);
      } else {
        ok = writer.write(`${randomId},`);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

generateFakeIds(1e7, writeStream);
