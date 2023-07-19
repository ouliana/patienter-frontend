import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Severity, updateEntryFunction } from '../../types';
import { toEntry } from '../../utils';
import { createNewEntry } from '../../services/patients';
import { v4 as uuidv4 } from 'uuid';
import {
  MessageActionKind,
  useMessageDispatch,
} from '../../context/MessageContext';

const NewEntryForm = ({
  patientId,
  update,
}: {
  patientId: string;
  update: updateEntryFunction;
}) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(1);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState('HealthCheck');

  const dispatchMesssage = useMessageDispatch();

  const handleCancel = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating(1);
    setDiagnosisCodes([]);
  };

  const handleEntryTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEntryType((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = toEntry({
      id: uuidv4(),
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating,
      diagnosisCodes,
    });
    try {
      const res = await createNewEntry(patientId, newEntry);
      update(res);
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
      <FormGroup>
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
        <TextField
          id='description'
          label='Description'
          variant='standard'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          id='date'
          label='Date'
          variant='standard'
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          id='specialist'
          label='Specialist'
          variant='standard'
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <TextField
          id='diagnosis-codes'
          label='Diagnosis codes'
          variant='standard'
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
        />
        {entryType === 'HealthCheck' && (
          <TextField
            id='health-check'
            label='Healthcheck rating'
            variant='standard'
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value))
            }
          />
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
