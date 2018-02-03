const sia = require('./src');

sia.getGroups(
  35945,
  {
    host: 'https://siaman.unal.edu.co',
    eco: 'https://sia-eco.herokuapp.com',
    id: 'sia-api-demo'
  }
).then(res => {
  console.log(res);
}, err => {
  console.log(err);
});