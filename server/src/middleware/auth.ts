import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

export const authCheck = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token invalid" });
  }
};
