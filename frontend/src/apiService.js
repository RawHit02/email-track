import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const saveSequence = async (sequenceData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sequences`, sequenceData);
    return response.data;
  } catch (error) {
    console.error('Error saving sequence:', error);
    throw error;
  }
};

export const loadSequences = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sequences`);
    return response.data;
  } catch (error) {
    console.error('There was an error loading the sequences!', error);
    throw error;
  }
};

export const updateSequence = async (id, sequence) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/sequences/${id}`, sequence);
    return response.data;
  } catch (error) {
    console.error('There was an error updating the sequence!', error);
    throw error;
  }
};

export const deleteSequence = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/sequences/${id}`);
  } catch (error) {
    console.error('There was an error deleting the sequence!', error);
    throw error;
  }
};
