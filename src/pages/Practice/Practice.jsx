import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPracticeByCert } from "../../api/api";
import AnswerOption from "../Answer/AnswerOption";

export default function Practice() {

    const {exam, certificate} = useParams();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [listQuestionPractice, setListQuestionPractice] = useState([]);

    useEffect(() => {
        getPracticeByCert(exam, certificate)
        .then(data => {
            setListQuestionPractice(data);
        })
    }, [exam, certificate]);

    const currentQuestion = listQuestionPractice[currentQuestionIndex];

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const handleSelectQuestion = (question) => {
        setCurrentQuestionIndex(listQuestionPractice.indexOf(question))
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="container-fluid">
                        {
                            listQuestionPractice && listQuestionPractice.length > 0
                            ? listQuestionPractice.map((item) => (
                                <button 
                                    key={item.id}
                                    type="button" 
                                    className={`btn btn${currentQuestionIndex === item.id - 1 ? "-info" : "-outline-info"}`} 
                                    style={{width: "52px"}}
                                    onClick={() => handleSelectQuestion(item)}
                                >
                                    {item.id}
                                </button>
                            ))
                            : null
                        }
                    </div>
                </div>
            
                {
                    currentQuestion && (
                        <div className="col-md-9">
                            <h3>Question {currentQuestionIndex + 1}:</h3>
                            {
                                currentQuestion.question.split("\n").map((question) => (
                                    <p>{question}</p>
                                ))
                            }
                            <ul>
                                {currentQuestion.answers.map(answer => (
                                    <AnswerOption key={answer.id} answer={answer}/>
                                ))}
                            </ul>
                            <div className="accordion" id="accordionExample">
                                <div className="card">
                                    <div className="card-header" id="headingOne">
                                        <h2 className="mb-0">
                                            <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={`#collapse${currentQuestion.id}`} aria-expanded="true" aria-controls={`collapse${currentQuestion.id}`}>
                                                Explanation
                                            </button>
                                        </h2>
                                    </div>

                                    <div id={`collapse${currentQuestion.id}`} className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                        <div className="card-body">
                                            {
                                                currentQuestion.explanations.split("\n").map((explanation) => (
                                                    <p>{explanation}</p>
                                                ))    
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleNextQuestion}>Next</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}