/* eslint-disable no-await-in-loop */
const fs = require('fs');
const faker = require('faker');
const now = require('performance-now');
const colors = require('colors');
const path = require('path');
const csvWriter = require('csv-write-stream');

/*
  Number of Primary Records
*/
const limit = 1e2;

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
const generateData = async (l) => {
  const start = now();
  let _id;

  const generateReviewsData = async (id) => {
    const reviewWriter = new Writer(path.resolve('database', 'seedFiles', 'reviews.csv'), { flags: 'a' });
    const randomIndex = faker.random.number({ min: 0, max: 10 });
    for (let i = 0; i < randomIndex; i += 1) {
      const review = {
        guitarId: id,
        rating: faker.random.number({ min: 1, max: 5 }),
        author: faker.name.findName(),
        date: faker.date.past(),
        // id property might not be used on front end:
        id: faker.random.number({ min: 0, max: 100 }),
        description: faker.lorem.paragraphs(2),
      };
      const reviewResult = reviewWriter.write(review);
      if (reviewResult instanceof Promise) {
        await reviewResult;
      }
    }
    reviewWriter.end();
  };

  const guitarWriter = new Writer(path.resolve('database', 'seedFiles', 'guitars.csv'));
  for (let i = 1; i <= l; i += 1) {
    _id = i;
    const name = faker.commerce.productName();
    const guitar = {
      name,
      productId: i,
      _id,
    };
    generateReviewsData(i);
    const res = guitarWriter.write(guitar);
    if (res instanceof Promise) {
      await res;
    }
    if (Number.isInteger((i / l) * 100)) {
      const timeElapsedInMinutes = Math.floor((now() - start) / 60000);
      console.log(`Seeding script progress: ${(i / l) * 100}%. Time Elapsed:${timeElapsedInMinutes} minutes.`.blue);
    }
  }

  guitarWriter.end();
  const end = now();
  console.log(`generateData() took ${Math.floor((end - start) / 60000)} minutes`.green);
};

generateData(limit);
