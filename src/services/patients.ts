import axios, { AxiosError } from 'axios';
import { Entry, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const baseURL = `${apiBaseUrl}/patients`;

export const getAllPatients = async (): Promise<Patient[]> => {
  try {
    const { data } = await axios.get<Patient[]>(`${baseURL}`);
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
    const { data } = await axios.get<Patient>(`${baseURL}/${id}`);
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

export const createNewEntry = async (patientId: string, entry: Entry): Promise<Entry[]> => {
  try {
    console.log(`${baseURL}/${patientId}/entries`);
    const { data } = await axios.post<Patient>(`${baseURL}/${patientId}/entries`, entry);
    return data.entries;
  } catch (error: unknown) {
    let errorMessage = 'Failed to create an entry.';
    if (error instanceof AxiosError) {
      if (error.response) {
        errorMessage = error.response.data;
      }
    }
    throw new Error(errorMessage);
  }
}
