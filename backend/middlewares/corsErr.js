const allowedCors = [
  'https://lkobtseva.nomoredomainsmonster.ru',
  'http://lkobtseva.nomoredomainsmonster.ru',
  'https://lkobtseva.nomoredomainsmonster.ru',
  'https://api.lkobtseva.nomoredomainsmonster.ru',
  'http://api.lkobtseva.nomoredomainsmonster.ru',
  'https://praktikum.tk',
  'http://praktikum.tk',
  'localhost:3000',
  'http://localhost:3000',
  '*',

];

module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
