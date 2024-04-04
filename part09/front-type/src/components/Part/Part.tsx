import { assetNever } from '../../utils';
import { Parts } from '../../types';

function Part({ part }: Parts) {
  switch (part.kind) {
    case 'basic':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
        </p>
      );

    case 'group':
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>Group project count {part.groupProjectCount}</i>
        </p>
      );
    case 'background':
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          <span>Submit to: {part.backgroundMaterial}</span>
        </>
      );
    case 'special':
      return (
        <>
          <b>
            {part.name} {part.exerciseCount}
          </b>
          <br />
          <i>{part.description}</i>
          <br />
          <span>
            Required skills: {part.requirements[0]}, {part.requirements[1]}
          </span>
        </>
      );
    default:
      assetNever(part);
      break;
  }
}

export default Part;

// return (
//   <>
//     {(() => {
//       courseParts.forEach((part: any) => {
//         switch (part.kind) {
//           case 'basic':
//             <p>{part.name}</p>;
//             return <p>Holaaa</p>
//             break;
//           case 'group':
//             console.log(part);
//             break;
//           case 'background':
//             console.log(part);
//             break;
//           default:
//             break;
//         }
//       });
//     })()}
//   </>
// );
