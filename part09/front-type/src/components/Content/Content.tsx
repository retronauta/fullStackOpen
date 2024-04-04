// import Part from '../Part/Part';
import { CoursePart } from '../../types';
import Part from '../Part/Part';

function Content({ courseParts }: { courseParts: CoursePart[] }) {
  return (
    <>
      {courseParts.map(part => {
        return <Part part={part} key={part.name} />;
      })}
    </>
  );
}

export default Content;
