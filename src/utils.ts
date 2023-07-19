import { SickLeave, Entry, HealthCheckRating, Discharge } from "./types"



export const isHealthCheckRating = (value: unknown): value is HealthCheckRating => {
  return typeof value === 'number' && Object.values(HealthCheckRating).includes(value)
}

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  if (!sickLeave || typeof sickLeave !== 'object') {
    throw new Error('Invalid data');
  }

  return (
    'startDate' in sickLeave &&
    isString(sickLeave.startDate) && isDate(sickLeave.startDate) &&
    'endDate' in sickLeave &&
    isString(sickLeave.endDate) && isDate(sickLeave.endDate)
  );
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  if (!discharge || typeof discharge !== 'object') {
    throw new Error('Invalid data');
  }

  return (
    'date' in discharge &&
    isString(discharge.date) && isDate(discharge.date) &&
    'criteria' in discharge &&
    isString(discharge.criteria)
  );
};

export const toEntry = (obj: unknown): Entry => {
  if (!obj || typeof obj !== 'object') throw new Error('Entry should be an object');

  if ('id' in obj &&
    'description' in obj &&
    'date' in obj &&
    'specialist' in obj) {
    if ('diagnosisCodes' in obj && !Array.isArray(obj.diagnosisCodes)) throw new Error('Invalid data for diagnosis property');

    if ('type' in obj) {
      switch (obj.type) {
        case 'HealthCheck':
          if ('healthCheckRating' in obj) return obj as Entry;
          throw new Error('missing healthCheckRating property')
        case 'OccupationalHealthcare':
          if ('employerName' in obj) {
            if ('sickLeave' in obj && !isSickLeave(obj.sickLeave)) throw new Error('Invalid data for sick leave')
            return obj as Entry
          }
          throw new Error('missing employerName property');
        case 'HospitalEntry':
          if ('discharge' in obj && isDischarge(obj.discharge)) return obj as Entry
          throw new Error('missing discharge property');
        default:
          throw new Error('Invalid type');
      }
    }
    throw new Error('missing type property')

  }

  throw new Error('Misssing properties for BaseEntry');
}
