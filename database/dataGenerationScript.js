/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const faker = require('faker');
const now = require('performance-now');
const colors = require('colors');
// Data Size:
const limit = 10000000;

const generateData = (dataSize) => {
  let data = '';
  let _id = 0;
  let review = {
    _id,
    rating: faker.random.number({ min: 1, max: 5 }),
    author: faker.name.findName(),
    date: faker.date.past(),
    // id property might not be used on front end:
    id: faker.random.number({ min: 0, max: 100 }),
    description: faker.lorem.paragraphs(2),
  };
  for (let i = 0; i < dataSize; i += 1) {
    // Reassign _id so that guitar and review are linked
    _id = i;
    if (i % 5 === 0) {
      review = {
        _id,
        rating: faker.random.number({ min: 1, max: 5 }),
        author: faker.name.findName(),
        date: faker.date.past(),
        // id property may not be used on front end:
        id: faker.random.number({ min: 0, max: 100 }),
        description: faker.lorem.paragraphs(2),
      };
    }
    const guitar = {
      name: faker.commerce.productName,
      productId: i,
      _id: i,
    };
    // Commas for easy parsing
    data += `${JSON.stringify(review)}, ${JSON.stringify(guitar)}, `;
  }

  // Clear file first
  fs.writeFile('database/seedFiles/test.txt', '', (err) => {
    if (err) {
      throw err;
    }
    console.log('File Cleared!'.blue);
    fs.writeFile('database/seedFiles/test.txt', data, (error) => {
      if (error) {
        throw error;
      }
      const stats = fs.statSync('database/seedFiles/test.txt');
      const fileSizeInBytes = stats.size;
      console.log(`The file has been saved! File size is ${fileSizeInBytes / 1000000.0} MBs`.red);
    });
  });
};

// Track performance:
const start = now();
generateData(limit);
const end = now();
console.log(`generateData() took ${end - start} milliseconds`.green);
