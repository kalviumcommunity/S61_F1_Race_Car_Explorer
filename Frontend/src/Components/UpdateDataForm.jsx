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
    }, []);

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
        console.log({id})
        console.log(updatedRaceCarData)
        try {
            console.log('selectedRaceCarId:', id);
            const returnData = await axios.put(`http://localhost:3000/api/racecars/${id}`);
            console.log(returnData.data)
            // setSelectedRaceCarId(null);
            const updatedData = await axios.get("http://localhost:3000/api/racecars")
            console.log(updatedData)
        } catch (error) {
            console.log('Error updating race car:', error);
        }
    };

    // console.log("Race car IDs:", raceCars.map(raceCar => raceCar.id));

    return (
        <div>
            {raceCars.map((raceCar,i) => (
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
                                    value={raceCar.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="team"
                                    placeholder="Enter team"
                                    value={raceCar.team}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="carModel"
                                    placeholder="Enter car model"
                                    value={raceCar.carModel}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="engine"
                                    placeholder="Enter engine"
                                    value={raceCar.engine}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="winsIn2023Season"
                                    placeholder="Enter wins in 2023 season"
                                    value={raceCar.winsIn2023Season}
                                    onChange={handleChange}
                                />
                                <input
                                    type="number"
                                    name="polePositionsIn2023Season"
                                    placeholder="Enter pole positions in 2023 season"
                                    value={raceCar.polePositionsIn2023Season}
                                    onChange={handleChange}
                                />
                                <button onClick={()=>handleSubmit(raceCar._id)}>Update</button>
                            </div>
                        )}
                        {selectedRaceCarId !== raceCar._id && (
                            <button onClick={() => handleEdit(raceCar._id)}>Edit</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default UpdateDataForm;
