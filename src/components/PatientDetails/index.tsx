import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOnePatient } from '../../services/patients';
import { Patient, Gender } from '../../types';
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

const PatientDetails = () => {
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
          </Box>
          <Box>
            <Typography variant='body1'>
              occupation: {patient.occupation}
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PatientDetails;
