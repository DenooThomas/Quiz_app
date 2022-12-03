import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Question from '../Question/Question';
import './styling.css';

function Quiz(props) {
  const { apiData, quizStarted, setQuizStarted } = props;
  const [formData, setFormData] = useState(apiData);
  const [isForm, setIsForm] = useState(false);
  const [scoreCounter, setScoreCounter] = useState(0);

  function startQuiz() {
    setQuizStarted(!quizStarted);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let selectedAnswers = 0;
    formData.forEach((form) => {
      if (form.selected_answer) {
        selectedAnswers += 1;
      }
      if (form.selected_answer === form.correct_answer) {
        setScoreCounter((prevScore) => prevScore + 1);
      }
    });
    if (selectedAnswers === formData.length) {
      setIsForm((prevFormState) => !prevFormState);
    }
  }
  console.log('formData => ', formData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {formData && formData.map((form) => (
          <Question
            key={nanoid()}
            questionId={form.id}
            category={form.category}
            difficulty={form.difficulty}
            question={form.question}
            allAnswers={form.all_answers}
            setFormData={setFormData}
            selectedAnswer={form.selected_answer}
            correctAnswer={form.correct_answer}
            isForm={isForm}
          />
        ))}
        <div className="question-submit-cont">
          <input className={isForm ? 'question-submit submitted' : 'question-submit'} type="submit" value="Check answers" />
        </div>
      </form>
      {isForm && (
      <h3 className="question-score">
        You scored
        {scoreCounter}
        /
        {formData.length}
        {' '}
        correct answers
      </h3>
      )}
      {isForm && <button type="button" className="home-button" onClick={() => startQuiz()}>Play again</button>}
    </>
  );
}

export default Quiz;
