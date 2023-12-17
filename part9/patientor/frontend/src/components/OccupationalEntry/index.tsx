import { OccupationalHealthcareEntry } from '../../types';
import { IoBagAdd } from 'react-icons/io5';

interface Props {
  entry: OccupationalHealthcareEntry;
}

function index({ entry }: Props) {
  return (
    <div>
      <p>
        {entry.date} <IoBagAdd />
        {entry.employerName}
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
}

export default index;
