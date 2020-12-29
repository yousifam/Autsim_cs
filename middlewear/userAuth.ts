import { errRes, okRes } from "../helpers/tools";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { User } from "../src/entity/User";

let userAuth;
export default userAuth = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) return errRes(res, "Miss token");
  let payload;
  try {
    payload = jwt.verify(token, config.jwtsecret);
  } catch (error) {
    return errRes(res, "invalid token");
  }
  let user = await User.findOne({
    where: { id: payload.id, active: true },
  });
  if (!user) return errRes(res, "please complete register proccess");

  req.user = user;

  return next();
};
