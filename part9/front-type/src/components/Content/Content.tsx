interface contentProps {
  courseParts: content[];
}

interface content {
  name: string;
  exerciseCount: number;
}

//* Dos maneras de recibir los props
// function Content(props: contentProps) {
function Content({ courseParts }: contentProps) {
  // const { courseParts } = props;
  return (
    <>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </>
  );
}

export default Content;
