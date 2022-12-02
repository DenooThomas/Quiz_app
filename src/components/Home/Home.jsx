import React from 'react'
import Quiz from 'components/Quiz/Quiz'

function Home({quizStarted, startQuiz, apiData}) {
  return (
    <div className={`main-cont ${quizStarted ? "quizOn" : "quizOff"}`}>
            {!quizStarted ? 
            <div className="home">
                <h1 className="home-title">Quizzical</h1>
                <h2 className="home-subtitle">Different questions every time!</h2>
                <button className="home-button" onClick={startQuiz}>Start quiz</button>
            </div> 
            :
            <React.Fragment>
            <Quiz 
                data={apiData}
                startQuiz={startQuiz}
            />
            </React.Fragment>
            }
        </div>
  )
}

export default Home