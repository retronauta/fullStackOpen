import { useState } from "react";

// button has text and handle click
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

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  console.log({ good, neutral, bad });
  const handleClick = (state, updateState) => {
    updateState(state + 1);
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
    </div>
  );
}

export default App;
