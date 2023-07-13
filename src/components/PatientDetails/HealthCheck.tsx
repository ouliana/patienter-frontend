import { Entry } from '../../types';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';

const HealthCheck: React.FC<{ entry: Entry }> = ({
  entry,
}: {
  entry: Entry;
}) => {
  if (entry.type !== 'HealthCheck') {
    throw new Error('Invalid data');
  }

  return <HealthCheckRatingIcon rating={entry.healthCheckRating} />;
};

export default HealthCheck;
