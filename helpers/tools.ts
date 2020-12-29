import * as bcrypt from "bcryptjs";
let accountSid = "AC2a72cbe15faa8f930404d11d28b69fa9";
let authToken = "76ddb4982142cf167119af21083420ec";

const errRes = (res, err, statusCode = 400) => {
  if (typeof err === "string") {
    let obj = {
      err: [err],
    };
    let response = { status: false, obj };
    res.statusCode = statusCode;
    return res.json(response);
  }
  let response = { status: false, err };
  res.statusCode = statusCode;
  return res.json(response);
};
const okRes = (res, data, statusCode = 200) => {
  let response = { status: true, data };
  res.statusCode = statusCode;
  return res.json(response);
};

const hashMyPassword = async (MainPassword) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(MainPassword, salt);
  return password;
};

export { errRes, okRes, hashMyPassword };
