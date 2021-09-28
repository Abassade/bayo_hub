const mailer = require("nodemailer");
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

async function sendMailNotification(data) {
  const oauth2Client = new OAuth2(
    process.env.MAILING_SERVICE_CLIENT_ID,
    process.env.MAILING_SERVICE_CLIENT_SECRET,
    OAUTH_PLAYGROUND,
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const smtpTransport = mailer.createTransport({
    service: 'gmail',
    debug: true,
    auth: {
      type: 'OAUTH2',
      user: process.env.EMAIL,
      clientId: process.env.MAILING_SERVICE_CLIENT_ID,
      clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });
  const mail = {
    from: `${data.title} <${process.env.EMAIL}>`,
    to: data.email,
    subject: data.subject,
    text: data.body,
  };

  return new Promise((resolve, reject) => {
    smtpTransport.sendMail(mail, (error, info) => {
      if (error) {
        console.info(error);
        reject(error);
      }
      if (info) {
        console.info('Message sent: ', info);
        resolve(info);
      }

      if (smtpTransport !== null) smtpTransport.close();
    });
  });
}

module.exports = sendMailNotification;