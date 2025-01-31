import React, { useRef, useState } from 'react'
import './Quiz/Quiz.css'
import { data } from '../assets/data';
const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false)

  const opt1 = useRef(null);
  const opt2 = useRef(null);
  const opt3 = useRef(null);
  const opt4 = useRef(null);

  const refArray = [opt1, opt2, opt3, opt4];


  const checkCorrect = (e, opt) => {
    if (lock === false) {
      if (question.ans == opt) {
        e.target.classList.add("correct");
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        refArray[question.ans - 1].current.classList.add("correct")
      }
      setLock(!lock)
    }
  }

  const handleNext = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true)
        return 0;
      }
      const nextIndex = index +1 ;
      setIndex(nextIndex);
      setQuestion(data[nextIndex]);
      setLock(!lock)
      refArray.map(opt => {
        opt.current.classList.remove("wrong");
        opt.current.classList.remove("correct");
        return null;
      })
    }
  }

  const handleReset = () =>{
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setResult(false);
    setLock(false)

  }
  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? <></> : <>
        <h2>{index + 1} . {question.question}</h2>
        <ul>
          <li ref={opt1} onClick={(e) => { checkCorrect(e, 1) }}>{question.option1}</li>
          <li ref={opt2} onClick={(e) => { checkCorrect(e, 2) }}>{question.option2}</li>
          <li ref={opt3} onClick={(e) => { checkCorrect(e, 3) }}>{question.option3}</li>
          <li ref={opt4} onClick={(e) => { checkCorrect(e, 4) }}>{question.option4}</li>
        </ul>
        <button onClick={handleNext}>Next</button>
        <div className='index'>{index + 1} out of {data.length} Questions</div>
      </>}

      {result ? <><h2>You scored {score} out of {data.length-1}</h2>
      <button onClick={handleReset}>Reset</button></> : <></>}
      
    </div>
  )
}

export default Quiz