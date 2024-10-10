const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.brightdata.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' },
        })
    );
};
