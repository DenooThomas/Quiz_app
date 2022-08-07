
import Quiz from "./components/Quiz/Quiz"
import React, { useState, useEffect } from "react"
import { nanoid } from 'nanoid'
import './appStyling.css'

export default function App(){

    const [apiData, setApiData] = useState()

    const fetchData = () => {
        fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(res => res.json())
        .then(data => setApiData(() => {
            return data.results.map(form => {
                const all_answers = [...form.incorrect_answers]
                const randomIndex = Math.floor(Math.random() * form.incorrect_answers.length + 1)
                all_answers.splice(randomIndex, 0, form.correct_answer)
                return {
                        ...form,
                        id: nanoid(), 
                        all_answers: all_answers
                }
            })
        }))
        
    }

    const [quizStarted, setQuizStarted] = useState(false)
    function startQuiz(){
        setQuizStarted(!quizStarted)
    }

    useEffect(() => {
        if(!quizStarted){
            fetchData()
        }
    }, [quizStarted])

    return(
      <div className={`main-cont ${quizStarted ? "quizOn" : "quizOff"}`}>
            {!quizStarted ? 
            <div className="home">
                <h1 className="home-title">Quizzical</h1>
                <h2 className="home-subtitle">Different questions every time!</h2>
                <button className="home-button" onClick={startQuiz}>Start quiz</button>
            </div> 
            :
            <div>
            <Quiz 
                data={apiData}
                startQuiz={startQuiz}
            />
            </div>
            }
        </div>
    )
}