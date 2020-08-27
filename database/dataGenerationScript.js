const fs = require('fs');

const generateData = () => {
  fs.writeFile('test.txt', data, (err) => {
    if (err) {
      throw err;
    }
    console.log('The file has been saved!');
  });
};