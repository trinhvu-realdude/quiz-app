import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkAnswers, getTestByExam } from "../../api/api";
import Question from "../../components/Question/Question";

export default function Test() {
    const { exam, certificate } = useParams();

    const navigate = useNavigate();

    const [listQuestionTest, setListQuestionTest] = useState([]);

    const [reviewQuestion, setReviewQuestion] = useState([]);

    const submitTest = () => {
        const questionTest = document.querySelectorAll(".question-test");
        let listReviewQuestion = [];
        questionTest.forEach((item) => {
            const inputList = item.lastChild.lastChild.childNodes;
            const reviewQuestionObject = {
                id: item.getAttribute("id"),
                checked: false,
            };
            inputList.forEach((input) => {
                if (input.firstChild.checked) {
                    reviewQuestionObject.checked = true;
                }
            });
            listReviewQuestion.push(reviewQuestionObject);
        });
        setReviewQuestion(listReviewQuestion);
    };

    const handleCheckAnswers = () => {
        checkAnswers(exam, certificate, listQuestionTest).then((data) => {
            data.forEach((item) => {
                item.answers.forEach((answer) => {
                    const isCheckedAnswer = document.getElementById(answer.id);
                    answer.isChecked = isCheckedAnswer.checked ? true : false;
                });
            });
            navigate(`/test/${exam}/${certificate}/result`, {
                state: {
                    checkedAnswers: data,
                },
            });
        });
    };

    useEffect(() => {
        getTestByExam(exam, certificate).then((data) => {
            setListQuestionTest(data);
        });
    }, [exam, certificate]);

    return (
        <div className="container d-flex justify-content-center">
            <Question listQuestion={listQuestionTest} />

            <div>
                <button
                    type="button"
                    className="btn btn-info mb-4"
                    data-toggle="modal"
                    data-target="#modalReviewQuestion"
                    onClick={() => submitTest()}
                >
                    Submit
                </button>
            </div>

            <div
                className="modal fade"
                id="modalReviewQuestion"
                tabIndex="-1"
                aria-labelledby="modalReviewQuestionLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="modalReviewQuestionLabel"
                            >
                                Review
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Question</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reviewQuestion && reviewQuestion.length > 0
                                        ? reviewQuestion.map((item) => (
                                              <tr key={item.id}>
                                                  <th scope="row">{item.id}</th>
                                                  <td>
                                                      {item.checked
                                                          ? "Answered"
                                                          : "Not answered yet"}
                                                  </td>
                                              </tr>
                                          ))
                                        : null}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={() => handleCheckAnswers()}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
