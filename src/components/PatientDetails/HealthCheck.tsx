import { Entry } from '../../types';
import { Box } from '@mui/material';
import HealthCheckRatingIcon from './HealthCheckRatingIcon';

const HealthCheck: React.FC<{ entry: Entry }> = ({
  entry,
}: {
  entry: Entry;
}) => {
  if (entry.type !== 'HealthCheck') {
    throw new Error('Invalid data');
  }

  return (
    <Box>
      <HealthCheckRatingIcon rating={entry.healthCheckRating} />
    </Box>
  );
};

export default HealthCheck;
