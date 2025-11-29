import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    disease: String
});

export default mongoose.model("Patient", patientSchema);
