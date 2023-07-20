import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePatient } from '../../services/patients';
import { Patient, Gender, Entry, Severity } from '../../types';
import { Container, Box, Typography } from '@mui/material';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import TransgenderOutlinedIcon from '@mui/icons-material/TransgenderOutlined';
import EntryCard from './EntryCard';
import NewEntryForm from './NewEntryForm';
import MessageBox from '../MessageBox';
import MessageContext, {
  MessageActionKind,
  useMessageDispatch,
} from '../../context/MessageContext';

const DisplayGender = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Male:
      return <MaleOutlinedIcon />;
    case Gender.Female:
      return <FemaleOutlinedIcon />;
    case Gender.Other:
      return <TransgenderOutlinedIcon />;
    default:
      return null;
  }
};

const PatientDetails = () => {
  const id = useParams().id;
  if (!id) {
    throw new Error('Invalid URL');
  }

  const [patient, setPatient] = useState<Patient | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const dispatchMesssage = useMessageDispatch();

  const updateEntries = (newEntry: Entry): void => {
    setEntries(entries.concat(newEntry));

    //Display success message
    dispatchMesssage({
      type: MessageActionKind.Set,
      payload: {
        content: 'New entry added',
        severity: Severity.Success,
      },
    });
    setTimeout(
      () =>
        dispatchMesssage({
          type: MessageActionKind.Clear,
          payload: { content: '' },
        }),
      5000
    );
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await getOnePatient(id);
        setPatient(response);
      } catch (e) {
        let errorMessage = 'Failed to fetch a patient';
        if (e instanceof Error) {
          errorMessage += ' Error: ' + e.message;
        }

        //Display error message
        dispatchMesssage({
          type: MessageActionKind.Set,
          payload: { content: errorMessage, severity: Severity.Error },
        });
        setTimeout(
          () =>
            dispatchMesssage({
              type: MessageActionKind.Clear,
              payload: { content: '' },
            }),
          5000
        );
      }
    })();
  }, [id]);

  useEffect(() => {
    if (patient) {
      console.log('patient.entries', patient.entries);
      setEntries(patient.entries);
    }
  }, [patient]);

  return (
    <Container sx={{ my: '2rem' }}>
      {patient && (
        <Box>
          <Typography
            variant='h5'
            style={{ marginBottom: '0.5em' }}
          >
            {patient.name}
            <DisplayGender gender={patient.gender} />
          </Typography>
          <Box>
            <Typography variant='body1'>ssn: {patient.ssn}</Typography>
            <Typography variant='body1'>
              occupation: {patient.occupation}
            </Typography>
          </Box>

          <Box>
            <Typography variant='body1'>ssn: {patient.ssn}</Typography>
            <MessageBox />
            <NewEntryForm
              patientId={patient.id}
              update={updateEntries}
            />
          </Box>

          <Box sx={{ marginTop: '4rem' }}>
            <Typography
              variant='h6'
              style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
            >
              Entries
            </Typography>
            {entries.length ? (
              entries.map(entry => (
                <EntryCard
                  entry={entry}
                  key={entry.id}
                />
              ))
            ) : (
              <Typography
                variant='body1'
                style={{ marginTop: '1rem' }}
              >
                No entries
              </Typography>
            )}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PatientDetails;
