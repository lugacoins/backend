const userService = require('../services/userService');

const me = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.sub);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      wallet: user.wallet,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  me,
};
