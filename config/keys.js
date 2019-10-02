
if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURL: process.env.DB_TOKEN,
        secretOrKey: process.env.DB_SECRET,
        mailUser: process.env.MAIL_USER,
        mailPass: process.env.MAIL_PASS
    }
} else {
    module.exports = require('./dev_keys.js')
}

