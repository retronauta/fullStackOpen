import HospitalEntry from '../HospitalEntry';
import OccupationalEntry from '../OccupationalEntry';
import HealthCheckEntry from '../HealthCheckEntry';
import { Entry } from '../../types';

interface Props {
  entry: Entry;
}

function EntryDetails({ entry }: Props) {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    default:
      return <></>;
  }
}

export default EntryDetails;
