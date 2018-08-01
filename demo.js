const sia = require('./src');

sia.getGroups(14484).then(res => {
  console.log(res[0].schedule);
}, err => {
  console.log(err);
});