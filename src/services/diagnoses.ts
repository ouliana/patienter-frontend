import axios from 'axios'
import { Diagnosis } from '../types'
import { apiBaseUrl } from '../constants';


export const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
  try {
    const { data } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return data;
  } catch (e: unknown) {
    let errorMessage = 'Failed to fetch a list of diagnoses.';
    if (e instanceof Error) {
      errorMessage += ' Error: ' + e.message;
    }
    throw new Error(errorMessage);
  }

}