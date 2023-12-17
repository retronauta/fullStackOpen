import { Typography } from '@mui/material';
import { Diagnose, Patient } from '../../types';
import { FaMars, FaVenus, FaVenusMars } from 'react-icons/fa';
import EntryDetails from './EntryDetails';
// import HospitalEntry from '../HospitalEntry';
// import OccupationalEntry from '../OccupationalEntry';
// import HealthCheckEntry from '../HealthCheckEntry';

interface Props {
  patient: Patient;
  diagnoses: Diagnose[];
}

function index({ patient, diagnoses }: Props) {
  const { entries } = patient;
  const results = entries.flatMap(entry => entry.diagnosisCodes);

  return (
    <>
      <Typography variant="h4" paddingBottom={2} paddingTop={2}>
        <strong>{patient?.name}</strong>{' '}
        {patient?.gender === 'other' && <FaVenusMars />}
        {patient?.gender === 'male' && <FaMars />}
        {patient?.gender === 'female' && <FaVenus />}
      </Typography>
      <div>
        <strong>ssn: </strong>
        {patient?.ssn}
      </div>
      <div>
        <strong>occupation: </strong> {patient?.occupation}
      </div>
      {patient?.entries?.length === 0 ? (
        <>
          <p>No entries yet</p>
        </>
      ) : (
        <>
          {/* ENTRIES TITLE */}
          <Typography variant="h5">
            <strong>Entries</strong>
          </Typography>

          {entries?.map(entry => {
            return <EntryDetails entry={entry} key={entry.id} />;
          })}

          <ul>
            {results.map(dx => {
              if (dx) {
                const dxName = (
                  diagnoses.find(diagnose => diagnose.code === dx) as Diagnose
                ).name;
                return (
                  <li key={dx}>
                    {dx}: {dxName}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default index;
