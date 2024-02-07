const mongoose = require('mongoose');
const {MONGO_CONNECTION_URI} = require('../config');

mongoose
  .connect(MONGO_CONNECTION_URI)
  .then(() => {
    console.log('Connected to PayTM DB');
  })
  .catch((error) => {
    console.log('Error connecting to PayTM DB', error);
  });
