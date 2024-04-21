const authRouter = require('./auth')
const actionRouter = require('./action')

function route(app) {
    app.use('/auth', authRouter)
    app.use('/action', actionRouter)
}

module.exports = route;