import { useState, useEffect } from "react";
import nations from "./nations";
import "flag-icons/css/flag-icons.css";
import "./App.css";

function App() {
  const [country, setCountry] = useState([]);
  const [flagCountry, setFlagCountry] = useState([]);
  const [score, setScore] = useState({ total: 0, correct: 0, incorrect: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState([]);

  const generateRandomNations = () => {
    let ct = [];
    for (let i = 0; i < 4; i++) {
      const r = Math.floor(Math.random() * nations.length);
      ct.push(nations[r]);
    }
    setCountry(ct);

    const index = Math.floor(Math.random() * 4);
    setFlagCountry(ct[index]);
  };

  const checkAnswer = (country) => {
    setSelected(country);
    if (country.name === flagCountry.name) {
      setScore({
        ...score,
        correct: score.correct + 1,
        total: score.total + 1,
      });
    } else {
      setScore({
        ...score,
        incorrect: score.incorrect + 1,
        total: score.total + 1,
      });
    }
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    generateRandomNations();
  };

  useEffect(() => {
    generateRandomNations();
  }, []);

  return (
    <div className="App py-20">
      <div>
        <h2 className="text-3xl md:text-4xl font-medium mb-2">
          Total: {score.total}
        </h2>
        <h2 className="text-3xl md:text-4xl font-medium mb-2  text-green-500">
          Correct: {score.correct}
        </h2>
        <h2 className="text-3xl md:text-4xl font-medium mb-2  text-red-500">
          Incorrect: {score.incorrect}
        </h2>
      </div>
      {flagCountry.name ? (
        <span
          className={`fi fi-${flagCountry["alpha-2"].toLowerCase()}`}
        ></span>
      ) : null}

      <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
        {country.map((c) => (
          <button
            className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300"
            onClick={(e) => checkAnswer(c)}
          >
            {" "}
            {c.name}{" "}
          </button>
        ))}
      </div>

      <div className="text-3xl md:text-4xl font-medium mb-2 py-5">
        {showAnswer ? (
          <h2
            className={
              flagCountry.name === selected.name ? "correct" : "incorrect"
            }
          >
            Correct : {flagCountry.name}
          </h2>
        ) : null}
      </div>
    </div>
  );
}

export default App;
