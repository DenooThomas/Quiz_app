import React from 'react';
import { nanoid } from 'nanoid';
import './styling.css';

export default function Question(props) {
  const { allAnswers, selectedAnswer, correctAnswer } = props;
  const { question, questionId } = props;
  const { isForm, setFormData } = props;

  function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }
  const questionFormatted = decodeHTMLEntities(question);
  function checkCorrect(currentAnswer) {
    if ((selectedAnswer === correctAnswer && selectedAnswer === currentAnswer)
    || correctAnswer === currentAnswer) {
      return 'correct submitted answer-item';
    }

    if (selectedAnswer === currentAnswer) {
      return 'wrong submitted answer-item';
    }

    return 'not-selected submitted answer-item';
  }

  function handleChange(event, id) {
    const { value } = event.target;
    setFormData((prevFormData) => prevFormData.map((form) => (form.id === id
      ? { ...form, selected_answer: value }
      : { ...form })));
  }

  const answerElements = [];
  function setAnswers() {
    allAnswers.map((answer) => {
      if (isForm) {
        return answerElements.push(
          <div
            className={checkCorrect(answer)}
            key={nanoid()}
          >
            <input
              className="answer-radio"
              type="radio"
              checked={selectedAnswer === answer}
              readOnly
            />
            <label htmlFor={answer}>{decodeHTMLEntities(answer)}</label>
          </div>,
        );
      }
      return answerElements.push(
        <div className={selectedAnswer === answer ? 'answer-item selected' : 'answer-item'} key={nanoid()}>
          <input
            type="radio"
            className="answer-radio"
            id={answer}
            name={answer}
            value={answer}
            onChange={(e) => handleChange(e, questionId)}
            checked={selectedAnswer === answer}
          />
          <label className="answer-label" htmlFor={answer}>{decodeHTMLEntities(answer)}</label>
        </div>,
      );
    });
  }
  setAnswers();

  return (
    <fieldset key={nanoid()}>
      <legend className="answer-legend" key={nanoid()}>{questionFormatted}</legend>
      <div className="answer-cont">
        {answerElements}
      </div>
    </fieldset>
  );
}
