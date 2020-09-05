/*
 *  Generate random numbers from 1 to 1e7 weighted towards higher numbers:
 */
const RNG = require('tweed-random');

const generator = new RNG('willie dustice');

const generateRandomId = (userContext, events, done) => {
  const highNumberProbability = generator.clone().weightBack();
  const randomHighId = highNumberProbability.randomInt(1, 1e7);
  userContext.vars.id = randomHighId;
  return done();
};

module.exports = {
  generateRandomId,
};
