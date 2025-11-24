import mongoose from "mongoose";
import dotenv from "dotenv";
import { roleModel } from "../models/role.model";

dotenv.config();

async function seedRoles() {


    try {

        const mongoURI = process.env.MONGO_URI ;
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB for seeding roles.");

        const roles = [
            { name: "customer", description: "Regular user with limited access" },
            { name: "farmer", description: "User with moderation privileges" },
        ];

        for (const role of roles) {
            const existingRole = await roleModel.findOne({ name: role.name });
            if (!existingRole) {
                await roleModel.create(role);
                console.log(`Role '${role.name}' created.`);
            } else {
                console.log(`Role '${role.name}' already exists.`);
            }
        }

        console.log("Role seeding completed.");
    } catch (error) {
        console.error("Error seeding roles:", error);
    } finally {
        mongoose.connection.close();
    }
}

seedRoles();