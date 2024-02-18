import { HealthCheckEntry } from '../../types';
import { MdHealthAndSafety } from 'react-icons/md';

interface Props {
  entry: HealthCheckEntry;
}

const heartIcon = (rating: number) => {
  switch (rating) {
    case 0:
      return '❤️';
    case 1:
      return '💛';
    case 2:
      return '❤️‍🩹';
    case 3:
      return '💔';
    default:
      return '';
  }
};

function index({ entry }: Props) {
  return (
    <div>
      <p>
        {entry.date} <MdHealthAndSafety />
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <p>{heartIcon(entry.healthCheckRating)}</p>
      <p>Diagnose by: {entry.specialist}</p>
    </div>
  );
}

export default index;
