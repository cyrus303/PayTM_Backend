const express = require('express');
require('./DB/index');
const userRoute = require('./Routes/userRoute');
const accountRoute = require('./Routes/accountRoute');
const cors = require('cors');
const {PORT} = require('./config');
const authenticateUser = require('./Middleware/authenticateUser');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/account', accountRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log('app running at ' + PORT);
});
