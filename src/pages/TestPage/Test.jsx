import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkAnswers, getTestByExam } from "../../api/api";
import Question from "../Question/Question";

export default function Test() {

    const {exam, certificate} = useParams();

    const [listQuestionTest, setListQuestionTest] = useState([]);

    const submitTest = () => {
        const questions = listQuestionTest.map(({id}) => ({id}));
        checkAnswers(exam, certificate, questions).then((data) => {
            console.log(data);
        })
    }

    useEffect(() => {
        getTestByExam(exam, certificate)
        .then(data => {
            setListQuestionTest(data)
        })
    }, [exam, certificate]);

    return (
        <div className="container">
            <button 
                type="button" 
                className="btn btn-info mb-4"
                onClick={() => submitTest()}
            >
                Sumit
            </button>

            <Question 
                listQuestion={listQuestionTest}
            />
        </div>
    );
}

