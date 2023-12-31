import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { Patient } from './types';

import { getAllPatients } from './services/patients';
import PatientListPage from './components/PatientListPage';
import PatientDetails from './components/PatientDetails';
import {
  useDiagnosesDispatch,
  DiagnosesActionKind,
} from './context/DiagnosesContext';
import { getAllDiagnoses } from './services/diagnoses';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const diagnosesDispatch = useDiagnosesDispatch();

  useEffect(() => {
    const fetchPatientList = async () => {
      const fetchedPatients = await getAllPatients();
      setPatients(fetchedPatients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnosisList = async () => {
      const data = await getAllDiagnoses();
      diagnosesDispatch({
        type: DiagnosesActionKind.SET,
        payload: data,
      });
    };
    void fetchDiagnosisList();
  }, [diagnosesDispatch]);

  return (
    <>
      <Router>
        <Container>
          <Typography
            variant='h3'
            style={{ marginBottom: '0.5em' }}
          >
            Patientor
          </Typography>
          <Button
            component={Link}
            to='/'
            variant='contained'
            color='primary'
          >
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route
              path='/'
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path='/patients/:id'
              element={<PatientDetails />}
            />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
