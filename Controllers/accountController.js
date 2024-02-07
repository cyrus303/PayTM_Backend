const z = require('zod');
const accountModel = require('../Model/accountModel');

const accountController = {};

accountController.balanceCheck = async (req, res) => {
  try {
    const {userId} = req;
    const UserBalance = await accountModel.findOne({userId});
    res.status(200).send({
      balance: UserBalance.balance,
    });
  } catch (error) {
    console.error('Error reading user balance', error);
    res.status(500).send({error: 'Internal Server Error'});
  }
};

accountController.transferAmount = async (req, res) => {
  const transferSchema = z.object({
    to: z.string(),
    amount: z.number().gte(1),
  });

  const {success} = transferSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: 'Incorrect input formats',
    });
  }

  try {
    const {to, amount} = req.body;
    const {userId} = req;

    let CurrentUser = await accountModel.findOne({userId: userId});

    if (CurrentUser.balance < amount) {
      return res.status(400).send({
        message: 'Insufficient funds',
      });
    }

    const operations = [
      {
        updateOne: {
          filter: {userId: to},
          update: {$inc: {balance: amount}},
          new: true,
        },
      },
      {
        updateOne: {
          filter: {userId},
          update: {$inc: {balance: -amount}},
          new: true,
        },
      },
    ];

    const result = await accountModel.bulkWrite(operations);
    res.status(200).send({message: 'Transfer successful'});
  } catch (error) {
    console.log('catch');
    console.log(error);
    return res.status(400).json({
      message: 'Invalid account',
    });
  }
};

module.exports = accountController;
