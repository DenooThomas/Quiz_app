import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './appStyling.css';
import Home from 'components/Home/Home';

export default function App() {
  const [apiData, setApiData] = useState();
  console.log('apiData => ', apiData);
  const fetchData = () => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((res) => res.json())
      .then((data) => setApiData(() => data.results.map((question) => {
        const allAnswers = [...question.incorrect_answers];
        const randomIndex = Math.floor(Math.random() * question.incorrect_answers.length + 1);
        allAnswers.splice(randomIndex, 0, question.correct_answer);
        return {
          ...question,
          id: nanoid(),
          allAnswers,
        };
      })));
  };

  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (!quizStarted) {
      fetchData();
    }
  }, [quizStarted]);

  return (
    <Home
      quizStarted={quizStarted}
      setQuizStarted={setQuizStarted}
      apiData={apiData}
    />
  );
}
