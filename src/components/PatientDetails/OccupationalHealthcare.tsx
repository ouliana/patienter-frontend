import { Box, Stack, Typography } from '@mui/material';
import { Entry } from '../../types';

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  if (entry.type !== 'OccupationalHealthcare') {
    throw new Error('Invalid data');
  }

  if (!entry.sickLeave) {
    return null;
  }

  return (
    <Box>
      <Stack
        direction='row'
        alignItems='center'
        sx={{ marginTop: '0.5rem' }}
      >
        <Typography
          variant='body2'
          sx={{ marginRight: '0.5rem', fontWeight: '600' }}
        >
          Sick leave:
        </Typography>
        <Typography variant='body2'>
          from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
        </Typography>
      </Stack>
    </Box>
  );
};

export default OccupationalHealthcare;
