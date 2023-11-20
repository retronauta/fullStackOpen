interface totalProps {
  totalExercises: number;
}

function Total({ totalExercises }: totalProps) {
  return <p>Number of exercises {totalExercises}</p>;
}

export default Total;
