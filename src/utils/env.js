const required = (key, fallback = undefined) => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

module.exports = {
  required,
};
