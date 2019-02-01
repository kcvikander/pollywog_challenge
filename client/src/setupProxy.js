const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('**/*.jpg', { target: 'http://localhost:8888' }));
};