import { HospitalEntry } from '../../types';
import { FaHospitalSymbol } from 'react-icons/fa';

interface Props {
  entry: HospitalEntry;
}

function index({ entry }: Props) {
  return (
    <div>
      <p>
        {entry.date} <FaHospitalSymbol />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>Discharge: {entry.discharge.criteria}</p>
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
}

export default index;
