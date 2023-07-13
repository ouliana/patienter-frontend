import { Box, Card, CardContent } from '@mui/material';
import { Entry } from '../../types';

import EntryDetails from './EntryDetails';
import EntryHeader from './EntryHeader';
import EntryCommonInfo from './EntryCommonInfo';

const EntryCard = ({ entry }: { entry: Entry }) => {
  return (
    <Box sx={{ minWidth: 275, my: '1rem' }}>
      <Card variant='outlined'>
        <CardContent
          // style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
          key={entry.id}
        >
          <EntryHeader entry={entry} />
          <EntryCommonInfo entry={entry} />
          <EntryDetails entry={entry} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default EntryCard;
