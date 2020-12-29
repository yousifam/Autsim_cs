import { Request, Response } from "express";
import { errRes, okRes, hashMyPassword } from "../../helpers/tools";
import * as validate from "validate.js";
import validation from "../../helpers/validation.helper";
import * as PhoneFormat from "iqphone";
import { User } from "../../src/entity/User";
import * as jwt from "jsonwebtoken";
import config from "../../config/config";
import * as bcrypt from "bcryptjs";

import { Like, Raw } from "typeorm";
import { Posts } from "../../src/entity/Posts";

export default class userControllers {
  static async register(req: Request, res: Response): Promise<object> {
    let notValid = validate(req.body, validation.register());
    if (notValid) return errRes(res, { notValid });
    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not a valid`);

    let phone = phoneObj.globalP;
    let user: any;

    try {
      user = await User.findOne({ where: { phone } });
      if (user) {
        return errRes(res, `Phone ${req.body.phone} already exists`);
      }
    } catch (error) {
      return errRes(res, error);
    }

    // TODO: Hash the password
    let hashPassword = await hashMyPassword(req.body.password);

    user = await User.create({
      ...req.body,
      password: hashPassword,
      active: true,
      phone,
    });

    await user.save();

    // TODO: create JWT Token

    var token = jwt.sign({ id: user.id }, config.jwtsecret);

    //to avoid return password in postamn
    user.password = null;

    return okRes(res, { user, token });
  }

  static async Login(req: Request, res: Response) {
    let userphone = req.body.phone;
    let userpassword = req.body.password;
    let notValid = validate(req.body, validation.login());
    if (notValid) return errRes(res, notValid);
    let phoneObj = PhoneFormat.getAllFormats(req.body.phone);
    if (!phoneObj.isNumber)
      return errRes(res, `Phone ${req.body.phone} is not a valid`);
    const phone = phoneObj.globalP;
    let user: any;
    try {
      user = await User.findOne({ where: { phone } });
      if (user) {
        if (await bcrypt.compareSync(userpassword, user.password)) {
          var token = jwt.sign({ id: user.id }, config.jwtsecret);
          return okRes(res, { user, token });
        } else {
          return errRes(res, "in correct password");
        }
      } else {
        return errRes(res, "user not exist");
      }
    } catch (error) {
      return errRes(res, error);
    }
  }

  static async stations(req, res) {
    let stations: any;

    try {
      stations = await User.find({
        where: { active: true },
      });
      return okRes(res, stations);
    } catch (error) {
      return errRes(res, error);
    }
  }

  static async stations2(req, res) {
    let station: any;

    try {
      station = await User.find({
        where: {
          id: req.params.id,
        },
        relations: ["post"],
      });
      return station ? okRes(res, station) : errRes(res, "notfound");
    } catch (error) {
      return errRes(res, error);
    }
  }

  static async addpost(req, res): Promise<object> {
    let notValid = validate(req.body, validation.post());
    if (notValid) return errRes(res, notValid);
    let user = req.user;
    let post: any;

    try {
      post = await Posts.create({
        ...req.body,
        user,
      });
    } catch (error) {
      return errRes(res, error);
    }
    await post.save();
    return okRes(res, post);
  }
}
