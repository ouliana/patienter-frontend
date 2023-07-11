import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePatient } from '../../services/patients';
import { Patient, Gender, Diagnosis } from '../../types';
import { Container, Box, Typography } from '@mui/material';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import TransgenderOutlinedIcon from '@mui/icons-material/TransgenderOutlined';

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

const PatientDetails = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const id = useParams().id;
  if (!id) {
    throw new Error('Invalid URL');
  }

  const [patient, setPatient] = useState<Patient | null>(null);

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
        console.log(errorMessage);
      }
    })();
  }, [id]);

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
            <Typography
              variant='h6'
              style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
            >
              Entries
            </Typography>
            {patient.entries.map(entry => (
              <Box
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
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PatientDetails;
