import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateDataForm() {
    const [raceCars, setRaceCars] = useState([]);
    const [selectedRaceCarId, setSelectedRaceCarId] = useState(null);
    const [updatedRaceCarData, setUpdatedRaceCarData] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3000/api/racecars')
            .then(response => {
                setRaceCars(response.data.raceCars);
                console.log(response.data.raceCars)
            })
            .catch(error => {
                console.log('Error fetching race cars:', error);
            });
    }, [updatedRaceCarData]);

    const handleEdit = (id) => {
        setSelectedRaceCarId(id);
        // Set the initial values for updatedRaceCarData
        const raceCarToUpdate = raceCars.find(raceCar => raceCar._id === id)
        setUpdatedRaceCarData(raceCarToUpdate);
    };

    const handleChange = (e) => {
        console.log(updatedRaceCarData)
        const { name, value } = e.target;
        setUpdatedRaceCarData(prevData => ({
            ...prevData,
            [name]: value,
        }));

    };

    const handleSubmit = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/racecars/${id}`, updatedRaceCarData);
            const updatedData = await axios.get("http://localhost:3000/api/racecars");
            setRaceCars(updatedData.data.raceCars);
            setSelectedRaceCarId(null); // Clear selectedRaceCarId after updating
        } catch (error) {
            console.log('Error updating race car:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/racecars/${id}`);
            const updatedData = await axios.get("http://localhost:3000/api/racecars");
            setRaceCars(updatedData.data.raceCars);
        } catch (error) {
            console.log('Error deleting race car:', error);
        }
    };


    return (
        <div>
            {raceCars.map((raceCar, i) => (
                <div key={raceCar.id}>
                    <div className="race-car-info">
                        <h2>{raceCar.name}</h2>
                        <p>Team: {raceCar.team}</p>
                        <p>Car Model: {raceCar.carModel}</p>
                        <p>Engine: {raceCar.engine}</p>
                        <p>Wins in 2023 Season: {raceCar.winsIn2023Season}</p>
                        <p>Pole Positions in 2023 Season: {raceCar.polePositionsIn2023Season}</p>
                        {selectedRaceCarId === raceCar._id && (
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    value={updatedRaceCarData.name || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="team"
                                    placeholder="Enter team"
                                    value={updatedRaceCarData.team || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="carModel"
                                    placeholder="Enter car model"
                                    value={updatedRaceCarData.carModel || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="engine"
                                    placeholder="Enter engine"
                                    value={updatedRaceCarData.engine || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="winsIn2023Season"
                                    placeholder="Enter wins in 2023 season"
                                    value={updatedRaceCarData.winsIn2023Season || ""}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="polePositionsIn2023Season"
                                    placeholder="Enter pole positions in 2023 season"
                                    value={updatedRaceCarData.polePositionsIn2023Season || ""}
                                    onChange={handleChange}
                                />
                                <button onClick={() => handleSubmit(raceCar._id)}>Update</button>
                            </div>
                        )}
                        {selectedRaceCarId !== raceCar._id && (
                            <div>
                                <button onClick={() => handleEdit(raceCar._id)}>Edit</button>
                                <button onClick={() => handleDelete(raceCar._id)}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UpdateDataForm;
