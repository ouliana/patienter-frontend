import axios from 'axios';
import { Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
    return data;
  } catch (e: unknown) {
    let errorMessage = 'Failed to fetch list of patients.';
    if (e instanceof Error) {
      errorMessage += ' Error: ' + e.message;
    }
    throw new Error(errorMessage);
  }

};

export const getOnePatient = async (id: string): Promise<Patient> => {
  try {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return data;
  } catch (e: unknown) {
    let errorMessage = 'Failed to fetch a patient.';
    if (e instanceof Error) {
      errorMessage += ' Error: ' + e.message;
    }
    throw new Error(errorMessage);
  }
};

export const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};
