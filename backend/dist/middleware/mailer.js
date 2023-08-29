const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('./env');
let config = {
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
};
let transporter = nodemailer.createTransport(config);
module.exports = transporter;
//# sourceMappingURL=mailer.js.map