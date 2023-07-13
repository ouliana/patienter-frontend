import { Entry } from '../../types';

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  if (entry.type !== 'OccupationalHealthcare') {
    throw new Error('Invalid data');
  }

  return <></>;
};

export default OccupationalHealthcare;
