const PROXY_CONFIG = [
  {
      context: ['/api', '/management'],
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      logLevel: 'debug',
      ws: true
  }
];

module.exports = PROXY_CONFIG;
