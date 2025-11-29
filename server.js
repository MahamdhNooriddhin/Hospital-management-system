import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Patient from "./model/Patient.js";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("YOUR_MONGODB_ATLAS_URL")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Add Patient
app.post("/add", async (req, res) => {
    const { name, age, disease } = req.body;

    if (!name || !age || !disease) {
        return res.json({ status: "error", message: "Fill all fields" });
    }

    const patient = new Patient({ name, age, disease });
    await patient.save();

    res.json({ status: "success", message: "Patient added!", patient });
});

// View Patient
app.get("/view/:id", async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.json({ status: "error", message: "Patient not found" });
        }

        res.json(patient);
    } catch {
        res.json({ status: "error", message: "Invalid patient ID" });
    }
});

// List All Patients
app.get("/list", async (req, res) => {
    const patients = await Patient.find();
    res.json(patients);
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
