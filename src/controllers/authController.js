const { signToken } = require('../utils/jwt');
const userService = require('../services/userService');

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.validated.body;
    const user = await userService.createUser({ email, password, name });
    const token = signToken({ sub: user.id, email: user.email });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        wallet: user.wallet,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.validated.body;
    const user = await userService.verifyUser({ email, password });
    const token = signToken({ sub: user.id, email: user.email });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
