import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] ?? "";
  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET!);
    //@ts-ignore
    if (decoded.userId) {
      //@ts-ignore
      req.userId = decoded.userId;
      return next();
    } else {
      return res.status(403).json({
        msg: "You are not authorized",
      });
    }
  } catch (e) {
    return res.status(403).json({
      msg: "You are not authorized",
    });
  }
};
