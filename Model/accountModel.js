const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  balance: {
    type: Number,
    required: true,
  },
});

const accountModel = mongoose.model('accountModel', accountSchema);

module.exports = accountModel;
