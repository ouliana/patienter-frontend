import axios from 'axios';
import { Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

export const getAllPatients = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

export const getOnePatient = async (id: string): Promise<Patient> => {
  try {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return data;
  } catch (error) {
    let errorMessage = 'Failed to fetch a patient.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    throw new Error(errorMessage);
  }
};

export const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};
