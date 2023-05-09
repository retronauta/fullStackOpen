import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Feedback = ({ text, state }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{state}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, total }) => {
  if (total) {
    return (
      <>
        <h1>Statistics</h1>

        <table>
          <tbody>
            <Feedback text="good" state={good} />
            <Feedback text="neutral" state={neutral} />
            <Feedback text="bad" state={bad} />
            <Feedback text="all" state={total} />
            <Average total={total} />
            <PositivePercentage good={good} total={total} />
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <p>No feedback given</p>
    </>
  );
};

const Average = ({ total }) => {
  return (
    <tr>
      <td>average</td>
      <td>{(total / 3).toFixed(1)}</td>
    </tr>
  );
};

const PositivePercentage = ({ good, total }) => {
  return (
    <tr>
      <td>positive</td>
      <td>{((good / total) * 100).toFixed(1)} %</td>
    </tr>
  );
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

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
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
}

export default App;
