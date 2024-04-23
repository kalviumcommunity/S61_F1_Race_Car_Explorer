const { Router } = require('express');
const { TeamModal } = require("./Schema");

const raceRouter = Router();

// Route for creating a new race car
raceRouter.post('/racecars', async (req, res) => {
  try {
    const raceCar = await TeamModal.create(req.body);
    res.status(200).send({ msg: "Race car created successfully", raceCar });
  } catch (error) {
    res.status(500).json({ errMsg: "Invalid post request", error });
  }
});

// Route for getting all race cars
raceRouter.get('/racecars', async (req, res) => {
  // res.json({msg: "GET request successful"}) 
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

// Route for updating a race car by ID
raceRouter.put('/racecars/:id', async (req, res) => {
  try {
    const  { id }  = req.params;
    const updatedRaceCar = await TeamModal.findByIdAndUpdate(id, req.body);

    if (!updatedRaceCar) {
      return res.status(404).json({ message: "Race car not found" });
    }

    res.status(200).json({ message: "Race car updated successfully", raceCar: updatedRaceCar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route for updating a race car by ID
raceRouter.patch('/racecars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRaceCar = await TeamModal.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedRaceCar) {
      return res.status(404).json({ message: "Race car not found" });
    }

    res.status(200).json({ message: "Race car updated successfully", raceCar: updatedRaceCar });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


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


module.exports = {raceRouter};
