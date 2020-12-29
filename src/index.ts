import { createConnection } from "typeorm";
import * as express from "express";
import v1 from "../route/app/v1";
import { errRes } from "../helpers/tools";
import * as cors from "cors";

const port = process.env.PORT || 4000;
const app = express();
createConnection()
  .then(async (connection) => {
    app.use(cors({ origin: true }));

    app.use(express.json());
    app.use("/v1", v1);

    app.use((req, res, next) => {
      return errRes(res, "404 Not found");
    });
    app.listen(port, () => {
      console.log(`Running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
