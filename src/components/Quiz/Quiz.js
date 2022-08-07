import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Question from '../Question/Question'
import './styling.css'



export default function Quiz(props){
    const [formData, setFormData] = useState(props.data)
    const [isForm, setIsForm] = useState(false)
    const [scoreCounter, setScoreCounter] = useState(0)  
    function handleChange(event, question_id){
        const {value} = event.target
        setFormData(prevFormData => {
            return prevFormData.map(form => {    
                return form.id === question_id ? {...form, selected_answer: value} : {...form}
            })
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        let selectedAnswers = 0
        formData.forEach(form => {
            if(form.selected_answer){
                selectedAnswers++
            }
            if(form.selected_answer === form.correct_answer){
                setScoreCounter(prevScore => prevScore + 1)
            }
        })
        if(selectedAnswers === formData.length){
            setIsForm(prevFormState => !prevFormState)  
        } 
    }

    const questionElements = []
    function setQuestions(){
        formData.map(form => {
                return questionElements.push(
                <Question
                    key={nanoid()}
                    question_id={form.id}
                    category={form.category}
                    difficulty={form.difficulty}
                    question={form.question}
                    all_answers={form.all_answers}
                    handleChange={handleChange}
                    selected_answer={form.selected_answer}
                    correct_answer={form.correct_answer}
                    isForm={isForm}
                />) 
        })
    }
    setQuestions()

    return (
        <React.Fragment>
           <form onSubmit={handleSubmit}>
               {questionElements}
               <div className='question-submit-cont'>
               <input className={isForm ? "question-submit submitted" : "question-submit"} type="submit" value="Check answers" />
               </div> 
           </form>
            {isForm && <h3 className='question-score'>You scored {scoreCounter}/{formData.length} correct answers</h3>}
            {isForm && <button className="home-button" onClick={() => props.startQuiz()}>Play again</button>}
        </React.Fragment>
    )      
}