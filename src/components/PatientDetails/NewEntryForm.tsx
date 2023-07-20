import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { HealthCheckRating, Severity, updateEntryFunction } from '../../types';
import { createNewEntry } from '../../services/patients';
import { v4 as uuidv4 } from 'uuid';
import {
  MessageActionKind,
  useMessageDispatch,
} from '../../context/MessageContext';
import { useDiagnosesValue } from '../../context/DiagnosesContext';
import { toEntry } from '../../utils';

const NewEntryForm = ({
  patientId,
  update,
}: {
  patientId: string;
  update: updateEntryFunction;
}) => {
  const ratingStrings = Object.keys(HealthCheckRating).slice(4);

  const [date, setDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');
  const [entryType, setEntryType] = useState('HealthCheck');
  const [employerName, setEmployerName] = useState<string>('');
  const [sickLeaveStart, setSickLeaveStart] = useState<string>('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');

  const dispatchMesssage = useMessageDispatch();
  const diagnoses = useDiagnosesValue().diagnoses;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCodes>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const clearForm = () => {
    setDate('');
    setDescription('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating('');
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');
    setDischargeDate('');
    setDischargeCriteria('');
  };

  const handleCancel = () => {
    clearForm();
  };

  const handleEntryTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEntryType((event.target as HTMLInputElement).value);
  };

  const handleHealthCheckRating = (event: SelectChangeEvent) => {
    setHealthCheckRating(event.target.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = toEntry({
      id: uuidv4(),
      date,
      description,
      specialist,
      diagnosisCodes,
      type: entryType,
      healthCheckRating: ratingStrings.indexOf(healthCheckRating),
      employerName,
      sickLeave: {
        startDate: sickLeaveStart,
        endDate: sickLeaveEnd,
      },
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    });
    try {
      await createNewEntry(patientId, newEntry);
      update(newEntry);
      clearForm();
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage = error.message;
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup sx={{ marginTop: '2rem' }}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby='radio-buttons-group-label'
            defaultValue='HealthCheck'
            name='radio-buttons-group'
            value={entryType}
            onChange={handleEntryTypeChange}
          >
            <FormControlLabel
              value='HealthCheck'
              control={<Radio />}
              label='Health check'
            />
            <FormControlLabel
              value='OccupationalHealthcare'
              control={<Radio />}
              label='Occupational healthcare'
            />
            <FormControlLabel
              value='Hospital'
              control={<Radio />}
              label='Hospital'
            />
          </RadioGroup>
        </FormControl>
        <Input
          id='date'
          value={date}
          type='date'
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          id='description'
          label='Description'
          variant='standard'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />

        <TextField
          id='specialist'
          label='Specialist'
          variant='standard'
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <FormControl variant='standard'>
          <InputLabel id='diagnosis-codes-label'>Diagnosis codes</InputLabel>
          <Select
            labelId='diagnosis-codes-label'
            id='diagnosis-codes'
            multiple
            value={diagnosisCodes}
            onChange={handleCodeChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {diagnoses.map(diagnosis => (
              <MenuItem
                key={diagnosis.code}
                value={diagnosis.code}
              >
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {entryType === 'HealthCheck' && (
          <>
            <FormControl variant='standard'>
              <InputLabel id='health-check-label'>
                Healthcheck rating
              </InputLabel>
              <Select
                labelId='health-check-label'
                id='health-check'
                value={healthCheckRating}
                onChange={handleHealthCheckRating}
                label='Healthcheck rating'
                MenuProps={MenuProps}
              >
                {ratingStrings.map(value => (
                  <MenuItem
                    key={value}
                    value={value}
                  >
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}
        {entryType === 'OccupationalHealthcare' && (
          <>
            <TextField
              id='employerName'
              label='Employer name'
              variant='standard'
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <Box sx={{ marginTop: '1rem' }}>
              <Typography variant='body1'>Sick leave</Typography>
              <Box sx={{ marginLeft: '1rem' }}>
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={4}
                >
                  <Stack>
                    <Typography variant='body1'>Start date:</Typography>
                    <Input
                      id='sickLeaveStart'
                      type='date'
                      value={sickLeaveStart}
                      onChange={({ target }) => setSickLeaveStart(target.value)}
                    />
                  </Stack>
                  <Stack>
                    <Typography variant='body1'>End date:</Typography>
                    <Input
                      id='sickLeaveStart'
                      type='date'
                      value={sickLeaveEnd}
                      onChange={({ target }) => setSickLeaveEnd(target.value)}
                    />
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </>
        )}

        {entryType === 'Hospital' && (
          <>
            <Box sx={{ marginTop: '1rem' }}>
              <Typography variant='body1'>Discharge</Typography>
              <Box sx={{ marginLeft: '1rem' }}>
                <Stack
                  direction='row'
                  alignItems='center'
                  spacing={4}
                >
                  <Stack>
                    <Typography variant='body1'>Date:</Typography>
                    <Input
                      id='dischargeDate'
                      type='date'
                      value={dischargeDate}
                      onChange={({ target }) => setDischargeDate(target.value)}
                    />
                  </Stack>
                  <Stack sx={{ width: '100%' }}>
                    <Typography variant='body1'>Criteria:</Typography>
                    <Input
                      id='dischargeCriteria'
                      value={dischargeCriteria}
                      onChange={({ target }) =>
                        setDischargeCriteria(target.value)
                      }
                    />
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </>
        )}

        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ marginTop: '2rem' }}
        >
          <Button
            variant='contained'
            color='secondary'
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            type='submit'
          >
            Add
          </Button>
        </Stack>
      </FormGroup>
    </form>
  );
};

export default NewEntryForm;
