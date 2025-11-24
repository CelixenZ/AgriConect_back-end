import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { roleModel } from "../models/role.model";
import { userModel } from "../models/user.model";
import { userRoleModel }  from "../models/userRole.model";
import { Request , Response } from "express";


export const registerService = async ( req : Request , res : Response)=> {
    const { name, email, password, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address
    });

    const userResponse = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        roles: [],
    };

    res.status(201).json({
        message: "User registered successfully",
        user: userResponse,
    });

    // Assign default role (e.g., "customer")
    const customerRole = await roleModel.findOne({ name: "customer" });
    if (customerRole) {
        await userRoleModel.create({
            user_id: newUser._id,
            role_id: customerRole._id
        });
    }
    const roles = customerRole ? [customerRole.name] : [];
    if (customerRole){
        await userRoleModel.create({
            user_id: newUser._id,
            role_id: customerRole._id
        });
    }
    return newUser;

}