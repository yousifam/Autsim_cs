require("dotenv").config();
let config: any;
export default config = {
  jwtsecret: process.env.JWT_SECRET || "shhh",
  jwtsecret2: process.env.JWT_SECRET2 || "shhh",
  twilioaccount: process.env.TWILIO_ACCOUNT_SID || "shhh",
  twilioauth: process.env.TWILIO_AUTH_TOKEN || "shhh",
};
