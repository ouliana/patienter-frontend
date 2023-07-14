import { Box, Card, CardContent } from '@mui/material';
import { Entry } from '../../types';

import EntrySpecifics from './EntrySpecifics';
import EntryHeader from './EntryHeader';
import EntryCommonInfo from './EntryCommonInfo';

const EntryCard = ({ entry }: { entry: Entry }) => {
  return (
    <Box sx={{ minWidth: 275, my: '1rem' }}>
      <Card variant='outlined'>
        <CardContent key={entry.id}>
          <EntryHeader entry={entry} />
          <EntryCommonInfo entry={entry} />
          <EntrySpecifics entry={entry} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default EntryCard;
