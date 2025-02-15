import { IUser } from "../models/user.model"; // Adjust the path if needed

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {};
