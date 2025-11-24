import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { roleModel } from "../models/role.model";
import  userModel  from "../models/user.model";
import  userRoleModel from "../models/userRole.model";

dotenv.config();

async function seedAdmin() {
    try {
        const mongoURI = process.env.MONGO_URI ;
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB for seeding admin user."); 
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        return;
    };

    const adminEmail = process.env.ADMIN_EMAIL ;
    const adminPassword = process.env.ADMIN_PASSWORD ;
    const adminFullName = process.env.ADMIN_FULL_NAME ;
    const adminPhone = process.env.ADMIN_PHONE ;
    const adminAddress = process.env.ADMIN_ADDRESS || "admin";
    const adminRoleName = process.env.ADMIN_ROLE_NAME || "admin";
    //Validation
    if (!adminEmail || !adminPassword || !adminFullName || !adminPhone || !adminAddress) {
        console.error("Admin user information is incomplete in environment variables.");
        mongoose.connection.close();
        return;
    }

    let adminRole = await roleModel.findOne({ name: adminRoleName });
    if (!adminRole) {
        adminRole = await roleModel.create({ name: adminRoleName, description: "Administrator with full access" });
        console.log(`Role '${adminRoleName}' created.`);
    }
    
    let existingAdmin = await userModel.findOne({ email: adminEmail });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        const adminUser = await userModel.create({
            name: adminFullName,
            email: adminEmail,
            password: hashedPassword,
            phone: adminPhone,
            address: adminAddress
        });
        console.log("Admin user created.");
        
        await userRoleModel.create({
            user_id: adminUser._id,
            role_id: adminRole._id
        });
        console.log("Admin role assigned to admin user.");
    }
    else {
        console.log("Admin user already exists.");
    }

    console.log("Admin user seeding completed.");
    mongoose.connection.close();


};

seedAdmin();