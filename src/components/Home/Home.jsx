import React from 'react';
import Quiz from 'components/Quiz/Quiz';

function Home(props) {
  const { quizStarted, setQuizStarted, apiData } = props;

  function startQuiz() {
    setQuizStarted(true);
  }
  return (
    <div className={`main-cont ${quizStarted ? 'quizOn' : 'quizOff'}`}>
      {quizStarted
        ? (
          <Quiz
            data={apiData}
            setQuizStarted={setQuizStarted}
          />
        )
        : (
          <div className="home">
            <h1 className="home-title">Quizzical</h1>
            <h2 className="home-subtitle">Different questions every time!</h2>
            <button type="button" className="home-button" onClick={startQuiz}>Start quiz</button>
          </div>
        )}
    </div>
  );
}

export default Home;
