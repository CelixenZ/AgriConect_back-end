import { Request, Response } from "express";
import { registerService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  return await registerService(req, res);
};