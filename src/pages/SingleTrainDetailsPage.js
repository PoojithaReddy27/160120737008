// src/pages/SingleTrainDetailsPage.js

import React from 'react';

const SingleTrainDetailsPage = ({ train }) => {
  return (
    <div>
      <h1>Single Train Details</h1>
      {train && (
        <div>
          <p>Train Number: {train.trainNumber}</p>
          <p>Departure Time: {train.departureTime}</p>
          <p>Arrival Time: {train.arrivalTime}</p>
          {/* Additional details, station stops, intermediate arrival times, etc. */}
        </div>
      )}
    </div>
  );
};

export default SingleTrainDetailsPage;
