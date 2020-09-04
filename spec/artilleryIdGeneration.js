const faker = require('faker');

const generateRandomId = (userContext, events, done) => {
  const randomId = String(faker.random.number({ min: 1, max: 1e7 }));
  userContext.vars.id = randomId;
  return done();
};

module.exports = {
  generateRandomId,
};
