import { Box, Card, CardContent, Typography } from '@mui/material';
import { Entry } from '../../types';
import { useDiagnosesValue } from '../../DiagnosesContext';

import WorkIcon from '@mui/icons-material/Work';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const EntryCard = ({ entry }: { entry: Entry }) => {
  const diagnoses = useDiagnosesValue().diagnoses;

  return (
    <Box sx={{ minWidth: 275, my: '1rem' }}>
      <Card variant='outlined'>
        <CardContent
          style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
          key={entry.id}
        >
          <Typography
            variant='body2'
            style={{ fontWeight: '600' }}
          >
            {entry.date}
          </Typography>
          <Typography
            variant='body2'
            style={{ fontStyle: 'italic' }}
          >
            {entry.description}
          </Typography>
          <Typography variant='body2'>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map(dc => (
                <li key={dc}>
                  {dc} {diagnoses?.find(d => d.code === dc)?.name}
                </li>
              ))}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EntryCard;
