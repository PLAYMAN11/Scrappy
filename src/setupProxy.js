const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://api.brightdata.com',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }, // Ensures '/api' is stripped
            onProxyReq: (proxyReq, req, res) => {
                console.log('Proxying request to:', proxyReq.path);
            },
            onProxyRes: (proxyRes, req, res) => {
                console.log('Response received with status:', proxyRes.statusCode);
            },
            onError: (err, req, res) => {
                console.error('Error during proxying:', err);
                res.status(500).send('Proxy Error');
            }
        })
    );
};
