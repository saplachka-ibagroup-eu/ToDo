const { createProxyMiddleware } = require('http-proxy-middleware');


module.exports = function (app) {
    const appProxy = createProxyMiddleware( {
        target: 'https://localhost:7256',
        secure: false
    });

    const authProxy = createProxyMiddleware( {
        target: 'https://localhost:7071',
        secure: false
    });

    app.use('/api/*', appProxy);
    app.use('/auth/*', authProxy);
};
