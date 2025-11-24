import mongoose , {Schema , Document , Types } from "mongoose";
export interface IRole extends Document {
    _id: Types.ObjectId;
    name: string;
    description: string;
}

const roleSchema : Schema<IRole> = new Schema({
    name: { type: String , required: true , unique: true },
    description: { type: String , required: true },
} , {
    timestamps: true,
});

export const roleModel = mongoose.model<IRole>("Role" , roleSchema);
