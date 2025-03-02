const userRoute = require('./userRoute');

const mountRouters = (app) => {
    app.use('/api/v1/user', userRoute);
}

module.exports = mountRouters;