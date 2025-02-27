const nodemailer = require('nodemailer')
const { EMAIL, SMTP_HOST, SMTP_SSL, AUTHORIZATION_CODE } = require('../ENV.js')

const email = async ({ title = '', content = '' } = {}) => {
  try {
    console.log(SMTP_SSL?.toLowerCase() === 'true')
    const suffix = /@(?<suffix>.*)/.exec(EMAIL).groups.suffix
    const options = {
      host: SMTP_HOST,
      secure: SMTP_SSL?.toLowerCase() === 'true',
      auth: {
        user: EMAIL,
        pass: AUTHORIZATION_CODE,
      },
    }
    const transporter = nodemailer.createTransport(options)

    await transporter.verify()

    return transporter.sendMail({
      from: `稀土掘金助手 <${EMAIL}>`,
      to: EMAIL,
      subject: title,
      html: content,
    })
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = email
