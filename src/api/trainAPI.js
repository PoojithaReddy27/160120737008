// src/api/trainAPI.js

import axios from 'axios';

// Replace 'your_access_token_here' with your actual access token obtained from John Doe Railway.
const accessToken = 'rdxwKw';

const api = axios.create({
  baseURL: 'http://20.244.56.144/train/register', 
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});

// Function to check if a train is departing in the next 30 minutes
const isDepartingInNext30Minutes = (train) => {
  const departureTime = new Date(train.departureTime);
  const currentTime = new Date();
  const timeDifferenceInMinutes = (departureTime - currentTime) / (1000 * 60);
  return timeDifferenceInMinutes <= 30;
};

// Function to process and filter trains based on requirements
const processTrainsData = (trains) => {
  // Filter out trains departing in the next 30 minutes
  const filteredTrains = trains.filter((train) => !isDepartingInNext30Minutes(train));

  // Sort the remaining trains based on price, ticket availability, and departure time
  filteredTrains.sort((a, b) => {
    // Sort based on price in ascending order
    if (a.price !== b.price) {
      return a.price - b.price;
    }
    // Sort based on ticket availability in descending order
    if (b.ticketAvailability !== a.ticketAvailability) {
      return b.ticketAvailability - a.ticketAvailability;
    }
    // Sort based on departure time (after considering delays) in descending order
    const aDepartureTime = new Date(a.departureTime).getTime() + a.delay * 60 * 1000;
    const bDepartureTime = new Date(b.departureTime).getTime() + b.delay * 60 * 1000;
    return bDepartureTime - aDepartureTime;
  });

  return filteredTrains;
};

// Fetch all trains data and process/filter the result
export const getAllTrains = async () => {
  try {
    const response = await api.get('/trains');
    const processedTrains = processTrainsData(response.data);
    return processedTrains;
  } catch (error) {
    // Handle API call errors
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};

// Fetch single train data by ID
export const getSingleTrain = async (trainId) => {
  try {
    const response = await api.get(`/trains/${trainId}`);
    return response.data;
  } catch (error) {
    // Handle API call errors
    if (error.response) {
      console.error('Error response from server:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};
