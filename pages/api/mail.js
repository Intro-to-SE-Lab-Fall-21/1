const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
    Name: ${body.name}\r\n
    Email: ${body.email}\r\n
    Message: ${body.message}
  `;

  const data = {
    to: 'coopriley350@gmail.com',
    from: 'hi@eclient.xyz',
    subject: 'New web form message!',
    text: message,
    html: message.replace(/\r\n/g, '<br>')
  };

  mail.send(data);

  res.status(200).json({ status: 'Ok' });
  }
