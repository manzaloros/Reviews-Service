/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');
const now = require('performance-now');
require('colors');
const path = require('path');
const csvWriter = require('csv-write-stream');

/*
Number of Primary Records
*/
const { numberOfRecords } = require('../config.js');

/*
  CSV Writer Class
 */
class Writer {
  constructor(file) {
    this.writer = csvWriter();
    this.writer.pipe(fs.createWriteStream(file));
  }

  write(obj) {
    if (!this.writer.write(obj)) {
      return new Promise((resolve) => this.writer.once('drain', resolve));
    }
    return true;
  }

  end() {
    this.writer.end();
  }
}

/*
  Data Generation:
  Records time elapsed, total time, and percentage completed.
  Generate between 0-10 reviews per guitar
*/
const generateGuitarData = async (l) => {
  let _id;
  const start = now();
  const guitarWriter = new Writer(path.resolve('./', 'seedFiles', 'guitars.csv'));
  for (let i = 1; i <= l; i += 1) {
    _id = i;
    // TODO: Could be changed to a guitar or musical instrument name:
    const name = faker.commerce.productName();
    const guitar = {
      name,
      productId: i,
      _id,
    };
    const res = guitarWriter.write(guitar);
    if (res instanceof Promise) {
      await res;
    }
    if (Number.isInteger((i / l) * 100)) {
      const timeElapsedInMinutes = Math.floor((now() - start) / 60000);
      console.log(`Guitar seeding script progress: ${(i / l) * 100}%. Time Elapsed:${timeElapsedInMinutes} minutes.`.blue);
    }
  }

  guitarWriter.end();
};

const generateReviewsData = async (l) => {
  const start = now();
  const reviewWriter = new Writer(path.resolve('./', 'seedFiles', 'reviews.csv'));
  // Outer loop mirrors guitar list size:
  for (let i = 0; i < l; i += 1) {
    const randomIndex = faker.random.number({ min: 0, max: 10 });
    for (let j = 0; j < randomIndex; j += 1) {
      // id randomly distributed between 1 and limit
      const id = faker.random.number({ min: 1, max: l });
      const review = {
        guitarId: id,
        rating: faker.random.number({ min: 1, max: 5 }),
        author: faker.name.findName(),
        date: faker.date.past(),
        // id property might not be used on front end:
        // id: faker.random.number({ min: 0, max: 100 }),
        description: faker.lorem.paragraphs(2),
      };
      const reviewResult = reviewWriter.write(review);
      if (reviewResult instanceof Promise) {
        await reviewResult;
      }
    }
    if (Number.isInteger((i / l) * 100)) {
      const timeElapsedInMinutes = Math.floor((now() - start) / 60000);
      console.log(`Review seeding script progress: ${(i / l) * 100}%. Time Elapsed:${timeElapsedInMinutes} minutes.`.red);
    }
  }
  reviewWriter.end();
};

const generateData = (l) => {
  generateGuitarData(l);
  generateReviewsData(l);
  // const end = now();
  // console.log(`generateData() took ${Math.floor((end - start) / 60000)} minutes`.green);
};

generateData(numberOfRecords);
