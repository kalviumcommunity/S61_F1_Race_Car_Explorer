const express = require('express');
const { Router } = require('express');
const { TeamModal } = require("./Schema");
const Joi = require('joi');

const raceRouter = express.Router();

// Define Joi schema for validation
const raceCarSchema = Joi.object({
  name: Joi.string().required(),
  team: Joi.string().required(),
  carModel: Joi.string().required(),
  engine: Joi.string().required(),
  winsIn2023Season: Joi.number().integer().min(0).required(),
  polePositionsIn2023Season: Joi.number().integer().min(0).required(),
});

// Middleware for validating race car data
const validateRaceCar = (req, res, next) => {
  const { error } = raceCarSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

// Route for creating a new race car
raceRouter.post('/racecars',validateRaceCar, async (req, res) => {
  try {
    const raceCar = await TeamModal.create(req.body);
    res.status(200).send({ msg: "Race car created successfully", raceCar });
  } catch (error) {
    res.status(500).json({ errMsg: "Invalid post request", error });
  }
});

// Route for getting all race cars
raceRouter.get('/racecars', async (req, res) => {
  try {
    const raceCars = await TeamModal.find();
    res.status(200).send({ msg: "Race cars received", raceCars });
  } catch (error) {
    res.status(500).json({ errMsg: "Invalid get request", error });
  }
});

// Route for getting a single race car by ID
raceRouter.get('/racecars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const raceCar = await TeamModal.findById(id);
    
    if (!raceCar) {
      return res.status(404).json({ message: "Race car not found" });
    }
    
    res.status(200).json({ message: "Race car found", raceCar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for updating or patching a race car by ID
raceRouter.put('/racecars/:id', validateRaceCar, updateRaceCar);
raceRouter.patch('/racecars/:id', validateRaceCar, updateRaceCar);

// Function to handle race car updates
async function updateRaceCar(req, res) {
  try {
    const { id } = req.params;
    const options = req.method === 'PUT' ? {} : { new: true }; // Set options based on request method
    const updatedRaceCar = await TeamModal.findByIdAndUpdate(id, req.body, options);
 
    if (!updatedRaceCar) {
      return res.status(404).json({ message: "Race car not found" });
    }

    res.status(200).json({ message: "Race car updated successfully", raceCar: updatedRaceCar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Route for deleting a race car by ID
raceRouter.delete('/racecars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRaceCar = await TeamModal.findByIdAndDelete(id);

    if (!deletedRaceCar) {
      return res.status(404).json({ message: "Race car not found" });
    }

    res.status(200).json({ message: "Race car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { raceRouter };
