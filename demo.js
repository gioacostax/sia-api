const sia = require('./src');

sia.getGroups(
  4100896,
  { 
    host: 'https://siaman.unal.edu.co',
    //eco: 'https://sia-eco.herokuapp.com',
    //id: 'sia-js-demo'
  }
).then(res => {
  console.log(res);
}, err => {
  console.log(err);
});