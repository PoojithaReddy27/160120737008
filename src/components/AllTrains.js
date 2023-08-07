// src/pages/AllTrainsPage.js

import React, { useEffect, useState } from 'react';
import { getAllTrains } from '../api/trainAPI';

const AllTrainsPage = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const trainsData = await getAllTrains();
      setTrains(trainsData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>All Trains</h1>
      <table>
        <thead>
          <tr>
            <th>Train Number</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Sleeper Availability</th>
            <th>AC Availability</th>
            <th>Sleeper Price</th>
            <th>AC Price</th>
            <th>Delay</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr key={train.trainNumber}>
              <td>{train.trainNumber}</td>
              <td>{train.departureTime}</td>
              <td>{train.arrivalTime}</td>
              <td>{train.sleeperAvailability}</td>
              <td>{train.acAvailability}</td>
              <td>{train.sleeperPrice}</td>
              <td>{train.acPrice}</td>
              <td className={train.delay > 0 ? 'delayed' : ''}>{train.delay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTrainsPage;
