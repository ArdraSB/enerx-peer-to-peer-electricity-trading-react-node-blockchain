//twilio bills 0.1$ for one message
const twilio=require("twilio")
const twilio_sid="AC3dc84f47886afcd39ed6ff0e49521bdc";
const twilio_auth_token="f7cc0c877bf8df78d2efaf9a6546b969";
const twilio_phone="+15013007976"
const client=twilio(twilio_sid,twilio_auth_token);
module.exports=client