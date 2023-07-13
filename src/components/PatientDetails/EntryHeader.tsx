import { Stack, Typography } from '@mui/material';
import { Entry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const EntryHeader = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Stack
          direction='row'
          alignItems='center'
          spacing={1}
        >
          <Typography
            variant='body2'
            style={{ fontWeight: '600' }}
          >
            {entry.date}
          </Typography>

          <MedicalServicesIcon
            sx={{
              verticalAlign: 'text-top',
              color: '#1976d2',
              marginLeft: '0.5rem',
            }}
          />
        </Stack>
      );
    case 'OccupationalHealthcare':
      return (
        <Stack
          direction='row'
          spacing={1}
          alignItems='center'
        >
          <Typography
            variant='body2'
            style={{ fontWeight: '600' }}
          >
            {entry.date}
          </Typography>
          <WorkIcon
            sx={{
              verticalAlign: 'text-center',
              color: '#1976d2',
              display: 'inline-block',
            }}
          />

          <Typography
            variant='body2'
            style={{
              fontStyle: 'italic',
              display: 'inline-block',
            }}
          >
            {entry.employerName}
          </Typography>
        </Stack>
      );
    case 'Hospital':
      return (
        <Stack
          direction='row'
          alignItems='center'
          spacing={1}
        >
          <Typography
            variant='body2'
            style={{ fontWeight: '600' }}
          >
            {entry.date}
          </Typography>
          <LocalHospitalIcon
            sx={{
              verticalAlign: 'text-top',
              color: '#1976d2',
              display: 'inline-block',
            }}
          />
        </Stack>
      );
    default:
      return null;
  }
};

export default EntryHeader;
