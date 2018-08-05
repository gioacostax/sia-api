const siajs = require('./src');

siajs.getGroups('19499').then(res => {
  console.log('OK ', res.list[0]);
}, err => {
  console.log('ERROR: ', err);
});
