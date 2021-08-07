import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createConnection } from "typeorm";
import authRouter from "./routes/authRoute";
import clientRouter from "./routes/clientRoute";
import animalRouter from "./routes/animalRoute";
import userRouter from "./routes/userRoute";
import fileRouter from "./routes/fileRoute";
import cardRouter from "./routes/cardRoute";
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
  app.use("/users", userRouter);
  app.use("/", cardRouter);
  app.use("/files", fileRouter);

  // const user = new User();
  // user.firstname = "Mathis";
  // user.lastname = "Enjolras";
  // user.email = "mathis@gmail.com";
  // user.password =
  //   "$2b$11$wJetP39fIDiWByBL8G0gUegSnzkqOKitmQg0sXSSyfLRSMmcDz/eG";
  // await user.save();
})();
