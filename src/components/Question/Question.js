import { nanoid } from 'nanoid'
import './styling.css'

export default function Question(props){
    
    const selected_answer = props.selected_answer
    const correct_answer = props.correct_answer
    const question = decodeHTMLEntities(props.question)

    function decodeHTMLEntities(text) {
        let textArea = document.createElement('textarea');
        textArea.innerHTML = text;
        return textArea.value;
      }

    function checkCorrect(currentAnswer){
        if((selected_answer === correct_answer && selected_answer === currentAnswer) || correct_answer === currentAnswer){
            return 'correct submitted answer-item'
        }

        else if(selected_answer === currentAnswer){
            return 'wrong submitted answer-item'
        }

        else{
            return 'not-selected submitted answer-item'
        }
    }

    const answerElements = []
    function setAnswers(){
        props.all_answers.map(answer => {      
            if(props.isForm){
                return answerElements.push(
                    <div 
                        className={checkCorrect(answer)} 
                        key={nanoid()}>
                        <input
                            className='answer-radio' 
                            type="radio"
                            checked={selected_answer === answer}
                            readOnly={true}
                        />
                        <label htmlFor={answer}>{decodeHTMLEntities(answer)}</label>
                    </div>
                )

            }
            else{
            return answerElements.push(
                <div className={selected_answer === answer ? 'answer-item selected' : 'answer-item'} key={nanoid()}>
                    <input 
                        type="radio"
                        className='answer-radio' 
                        id={answer}
                        name={answer}
                        value={answer}
                        onChange={(event) => props.handleChange(event, props.question_id)}
                        checked={selected_answer === answer}
                    />
                    <label className="answer-label" htmlFor={answer}>{decodeHTMLEntities(answer)}</label>
                </div>
            )
            }
        })
    }
    setAnswers()
    
    return (
        <fieldset key={nanoid()}>
                    <legend className='answer-legend' key={nanoid()}>{question}</legend>
                    <div className='answer-cont'>
                        {answerElements}
                    </div>
        </fieldset>
    )
}