const userRoute = require('./userRoute');
const authRoute = require('./authRoute')

const mountRouters = (app) => {
    app.use('/api/v1/user', userRoute);
    app.use('/api/v1/auth', authRoute);
}

module.exports = mountRouters;