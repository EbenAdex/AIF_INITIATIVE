export const mailConfig = {
  transport: {
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },

    tls: {
      rejectUnauthorized: false,
    },

    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  },

  defaults: {
    from: `"AIF INITIATIVE" <${process.env.MAIL_FROM}>`,
  },
};