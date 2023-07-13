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
        >
          <Typography
            variant='body2'
            style={{ fontWeight: '600' }}
          >
            {entry.date}
            <MedicalServicesIcon
              sx={{
                fontSize: 'inherit',
                verticalAlign: 'text-top',
                color: '#1976d2',
                marginLeft: '0.5rem',
              }}
            />
          </Typography>
        </Stack>
      );
    case 'OccupationalHealthcare':
      return (
        <Stack
          direction='row'
          alignItems='center'
        >
          <Typography
            variant='body2'
            style={{ fontWeight: '600' }}
          >
            {entry.date}
            <WorkIcon
              sx={{
                fontSize: 'inherit',
                verticalAlign: 'text-top',
                color: '#1976d2',
                display: 'inline-block',
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
              }}
            />
          </Typography>
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
        >
          <Typography
            variant='body2'
            style={{ fontWeight: '600' }}
          >
            {entry.date}
            <LocalHospitalIcon
              sx={{
                fontSize: 'inherit',
                verticalAlign: 'text-top',
                color: '#1976d2',
                display: 'inline-block',
                marginLeft: '0.5rem',
                marginRight: '0.5rem',
              }}
            />
          </Typography>
        </Stack>
      );
    default:
      return null;
  }
};

export default EntryHeader;
