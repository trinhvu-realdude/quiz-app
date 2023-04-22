import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPracticeByCert } from "../../api/api";
import ButtonCarousel from "../ButtonCarousel/ButtonCarousel";
import Question from "../Question/Question";
import Error from "../Error/Error";

export default function Practice() {

    const {exam, certificate} = useParams();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [listQuestionPractice, setListQuestionPractice] = useState([]);

    const [displayExplanations, setDisplayExplanations] = useState(false);

    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        getPracticeByCert(exam, certificate)
        .then(data => {
            setListQuestionPractice(data)
        })
        .catch(error => {
            console.error("Error retrieving practice questions:", error);
            setErrorMessage("Sorry, no data found! We will update as soon as possible.")
        })
    }, [exam, certificate]);

    const currentQuestion = listQuestionPractice && listQuestionPractice.length > 0 ? listQuestionPractice[currentQuestionIndex] : null;

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const handleSelectQuestion = (question) => {
        setCurrentQuestionIndex(listQuestionPractice.indexOf(question))
    }

    console.log(exam);

    return (
        <div className="container-fluid">
            <div className="row">
                <ButtonCarousel
                    listQuestionPractice={listQuestionPractice}
                    handleSelectQuestion={handleSelectQuestion}
                    currentQuestionIndex={currentQuestionIndex}
                    setDisplayExplanations={setDisplayExplanations}
                />
                {
                    currentQuestion && (
                        <Question 
                            currentQuestion={currentQuestion}
                            currentQuestionIndex={currentQuestionIndex}
                            handleNextQuestion={handleNextQuestion}
                            listQuestion={listQuestionPractice}
                            displayExplanations={displayExplanations}
                            setDisplayExplanations={setDisplayExplanations}
                        />
                    )
                }
            </div> 
            {
                errorMessage && (
                    <Error 
                        message={errorMessage} 
                        context={exam}
                    />
                )
            }
            
        </div>
    );
}