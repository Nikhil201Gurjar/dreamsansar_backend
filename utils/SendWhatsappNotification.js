const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function SendWhatsAppNotification(to, message) {
  try {
    await client.messages.create({
    body: message,
    from: `whatsapp:${process.env.TWILIO_SANDBOX_NUMBER}`, // Twilio sandbox number
    to: `whatsapp:${to}`,
  });
  } catch (error) { throw new Error(error);   
  }
  
}
/*
client.messages
    .create({
                from: 'whatsapp:+14155238886',
        contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: '{"1":"12/1","2":"3pm"}',
        to: 'whatsapp:+916367286660'
    })
    .then(message => console.log(message.sid))
    .done(); */

module.exports = SendWhatsAppNotification;