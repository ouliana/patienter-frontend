import { Box, Stack, Typography } from '@mui/material';
import { Entry } from '../../types';

const Hospital = ({ entry }: { entry: Entry }) => {
  if (entry.type !== 'Hospital') {
    throw new Error('Invalid data');
  }

  return (
    <Box>
      <Typography
        variant='body2'
        sx={{ marginTop: '0.5rem', fontWeight: '500' }}
      >
        discharge:
      </Typography>
      <Stack
        direction='row'
        alignItems='center'
      >
        <Typography
          variant='body2'
          sx={{ marginRight: '0.3rem' }}
        >
          {entry.discharge.date}
        </Typography>
        <Typography variant='body2'>{entry.discharge.criteria}</Typography>
      </Stack>
    </Box>
  );
};

export default Hospital;
