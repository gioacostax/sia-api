const siajs = require('./src');

siajs.getSubjects('').then(res => {
  console.log('OK ', res);
}, err => {
  console.log('ERROR: ', err);
});

