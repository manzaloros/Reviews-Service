/* eslint-disable no-underscore-dangle */
const fs = require('fs');
const faker = require('faker');

const generateData = () => {
  let data = '';
  let _id = 0;
  let review = {
    _id,
    rating: faker.random.number({ min: 1, max: 5 }),
    author: faker.name.findName(),
    date: faker.date.past(),
    // id property might not be used on front end:
    id: faker.random.number({ min: 0, max: 100 }),
    description: faker.lorem('paragraphs', 2),
  };
  for (let i = 0; i < 100; i += 1) {
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
        description: faker.lorem('paragraphs', 2),
      };
    }
    const guitar = {
      name: faker.commerce.productName,
      productId: i,
      _id: i,
    };
    data += JSON.stringify(review) + JSON.stringify(guitar);
  }

  fs.writeFile('test.txt', data, (err) => {
    if (err) {
      throw err;
    }
    console.log('The file has been saved!');
  });
};

generateData();
