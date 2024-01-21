const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const { MONGO_URL = 'mongodb://127.0.0.1:localhost:27017/mestodb' } = process.env;
module.exports = {
  JWT_SECRET,
  MONGO_URL,
};
