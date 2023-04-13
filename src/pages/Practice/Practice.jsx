import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPracticeByCert } from "../../api/api";

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

    return (
        <div>
            {currentQuestion && (
                <div>
                    <h3>Question {currentQuestionIndex + 1}:</h3>
                    {
                        currentQuestion.question.split("\n").map((question) => (
                            <p>{question}</p>
                        ))
                    }
                    <ul>
                        {currentQuestion.answers.map(answer => (
                        <li key={answer.id}>{answer.option}</li>
                        ))}
                    </ul>
                    <div class="accordion" id="accordionExample">
                        <div class="card">
                            <div class="card-header" id="headingOne">
                            <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Explanation
                                </button>
                            </h2>
                            </div>

                            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div class="card-body">
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
            )}
        </div>
    );
}