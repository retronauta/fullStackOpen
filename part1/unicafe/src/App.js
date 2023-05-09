import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ text, state }) => {
  return (
    <p>
      {text} {state}
    </p>
  );
};

const Total = ({ total }) => {
  return <p>All {total}</p>;
};

const Average = ({ total }) => {
  return <p>Average {total / 3}</p>;
};

const PositivePercentage = ({ good, total }) => {
  return <p>Positive {(good / total) * 100}</p>;
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  console.log((good / total) * 100);

  const handleClick = (state, updateState) => {
    updateState(state + 1);
    setTotal(total + 1);
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => handleClick(good, setGood)} text="good" />
      <Button
        handleClick={() => handleClick(neutral, setNeutral)}
        text="neutral"
      />
      <Button handleClick={() => handleClick(bad, setBad)} text="bad" />
      <h1>Statistics</h1>
      <Statistics text="good" state={good} />
      <Statistics text="neutral" state={neutral} />
      <Statistics text="bad" state={bad} />

      <Total total={total} />

      <Average total={total} />

      <PositivePercentage good={good} total={total} />
    </div>
  );
}

export default App;
