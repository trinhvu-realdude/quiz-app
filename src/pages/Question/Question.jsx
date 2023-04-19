import AnswerOption from "../Answer/AnswerOption";

export default function Question({ currentQuestionIndex, currentQuestion, handleNextQuestion }) {
    return (
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
    );
}