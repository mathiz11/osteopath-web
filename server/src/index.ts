import cookieParser from "cookie-parser";
import express from "express";
import { createConnection } from "typeorm";
require("dotenv").config();
import authRouter from "./routes/authRoute";
import clientRouter from "./routes/clientRoute";
import cors from "cors";
// import { User } from "./entities/User";
// import { Client } from "./entities/Client";
// import { getConnection } from "typeorm";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.use(express.json());
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

  app.get("/", (_req, res) => {
    res.send("Hello !");
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server start on port ${port}`);
  });

  await createConnection();

  app.use("/auth", authRouter);
  app.use("/clients", clientRouter);

  // const user = new User();
  // user.firstname = "Mathis";
  // user.lastname = "Enjolras";
  // user.email = "mathis@gmail.com";
  // user.password =
  //   "$2b$11$wJetP39fIDiWByBL8G0gUegSnzkqOKitmQg0sXSSyfLRSMmcDz/eG";
  // await user.save();

  // const client = new Client();
  // client.firstname = "Catherine";
  // client.lastname = "Enjolras";
  // client.email = "catherine@gmail.com";
  // client.phone = "0606060606";
  // client.address = "44 rue du faubourg du Nord\n34130 MAUGUIO";
  // let mathis = await User.findOne({ where: { firstname: "Mathis" } });
  // if (mathis) {
  //   client.user = mathis;
  // }
  // await getConnection().getRepository(Client).save(client);
})();
