import { Box, Stack, Typography } from '@mui/material';
import { Entry } from '../../types';
import { useDiagnosesValue } from '../../DiagnosesContext';

const EntryCommonInfo = ({ entry }: { entry: Entry }) => {
  const { diagnoses } = useDiagnosesValue();

  return (
    <Box>
      <Stack
        direction='row'
        alignItems='top'
        sx={{ marginTop: '0.3rem' }}
      >
        <Typography
          variant='body2'
          style={{ fontStyle: 'italic' }}
        >
          {entry.description}
        </Typography>
      </Stack>
      <Stack
        direction='row'
        alignItems='center'
        sx={{ marginTop: '0.5rem' }}
      >
        <Typography
          variant='body2'
          sx={{ fontWeight: '500', marginRight: '0.3rem' }}
        >
          diagnose by:
        </Typography>
        <Typography variant='body2'> {entry.specialist}</Typography>
      </Stack>
      <Box>
        {entry.diagnosisCodes &&
          entry.diagnosisCodes.map(dc => (
            <Typography
              variant='body2'
              key={dc}
            >
              {dc} {diagnoses?.find(d => d.code === dc)?.name}
            </Typography>
          ))}
      </Box>
    </Box>
  );
};

export default EntryCommonInfo;
