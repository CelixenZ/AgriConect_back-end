import { Request, Response, NextFunction } from "express";

export {}; // <--- make this file a module

declare global {
  namespace Express {
    interface Request {
      user?: {
        role?: string;
        [key: string]: any;
      };
    }
  }
}

export const checkRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: "Unauthorized: No role found" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Forbidden: Only [${allowedRoles.join(", ")}] can access this resource`
      });
    }

    next();
  };
};
