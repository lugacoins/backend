const { validateCredentials, signToken } = require('../services/authService');

const login = (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (!validateCredentials(username, password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken({ sub: username, role: 'admin' });
  return res.json({ token, tokenType: 'Bearer' });
};

module.exports = {
  login
};
