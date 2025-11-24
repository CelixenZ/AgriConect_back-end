import { Request, Response } from "express";
import UserRole from "../models/userRole.model";
import User from "../models/user.model";
import Role from "../models/userRole.model";

export const assignRole = async (req: Request, res: Response) => {
  try {
    const { user_id, role_id } = req.body;

    // Check user
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check role
    const role = await Role.findById(role_id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    // Check if already assigned
    const exists = await UserRole.findOne({ user_id, role_id });
    if (exists) {
      return res.status(400).json({ message: "Role already assigned to user" });
    }

    const userRole = await UserRole.create({ user_id, role_id });
    res.status(201).json(userRole);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
