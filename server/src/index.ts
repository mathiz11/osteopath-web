import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createConnection } from "typeorm";
import authRouter from "./routes/authRoute";
import clientRouter from "./routes/clientRoute";
import animalRouter from "./routes/animalRoute";
require("dotenv").config();

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
  app.use("/", animalRouter);

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

  // const hindy = new Animal();
  // hindy.name = "Hindy";
  // hindy.type = AnimalType.DOG;
  // hindy.sex = "Femelle";
  // hindy.breed = "Bichon maltais";
  // const catherine = await getConnection()
  //   .getRepository(Client)
  //   .findOne({ where: { firstname: "Catherine" } });
  // if (catherine) {
  //   hindy.owner = catherine;
  // }
  // await getConnection().getRepository(Animal).save(hindy);
})();
