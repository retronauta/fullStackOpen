const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </>
  );
};

const Part = props => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = props => {
  const sumExercises = props.parts.reduce((acc, obj) => {
    return acc + obj.exercises;
  }, 0);
  return <p>Number of exercises {sumExercises}</p>;
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    // <div>
    //   <Header course={course.name} />
    //   <Content parts={course.parts} />
    //   <Total parts={course.parts} />
    // </div>
    <Course course={course} />
  );
};

export default App;
