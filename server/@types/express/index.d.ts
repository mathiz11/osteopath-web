import { LighterUser } from "src/entities/User";

declare global {
  namespace Express {
    interface Request {
      user: LighterUser;
    }
  }
}
