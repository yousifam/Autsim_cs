import * as express from "express";
const router = express.Router();
import userControllers from "../../controllers/app/user.controllers";
import userAuth from "../../middlewear/userAuth";

router.post("/register", userControllers.register);
router.post("/login", userControllers.Login);
router.post("/post", userAuth, userControllers.addpost);

router.get("/stations", userControllers.stations);
router.get("/station/:id", userControllers.stations2);

export default router;
