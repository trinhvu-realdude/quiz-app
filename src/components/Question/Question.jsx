import AnswerOption from "../Answer/AnswerOption";

export default function Question({ 
    currentQuestionIndex, 
    currentQuestion, 
    listQuestion,
    displayExplanations,
    setDisplayExplanations,
    correctSign,
    wrongSign,
    setCorrectSign,
    setWrongSign
}) {
    return (
        <div className="col-md-9 mt-2">
            {
                currentQuestion ? (
                    // Practice
                    <>
                        <h3>
                            Question {currentQuestionIndex + 1} of {listQuestion.length}:
                        </h3>
                        {
                            currentQuestion.question.split("\n").map((question, index) => (
                                <p key={index}>{question}</p>
                            ))
                        }
                        <AnswerOption 
                            answers={currentQuestion.answers} 
                            explanations={currentQuestion.explanations}
                            currentQuestionIndex={currentQuestionIndex}
                            displayExplanations={displayExplanations}
                            setDisplayExplanations={setDisplayExplanations}
                            correctSign={correctSign}
                            wrongSign={wrongSign}
                            setCorrectSign={setCorrectSign}
                            setWrongSign={setWrongSign}
                        />
                    </>
                ) : (
                    // Test
                    <>
                        {
                            listQuestion && listQuestion.length > 0 && (
                                listQuestion.map((item, index) => (
                                    <div key={index} className="question-test" id={index + 1}>
                                        <h3>
                                            Question {index + 1} of {listQuestion.length}:
                                        </h3>
                                        {
                                            item.question.split("\n").map((sentence, i) => (
                                                <p key={i}>{sentence}</p>
                                            ))
                                        }
                                        <AnswerOption 
                                            answers={item.answers}
                                            currentQuestionIndex={index + 1}
                                            isResultPage={true}
                                        />
                                    </div>
                                ))
                            ) 
                        }
                    </>
                )
            }
        </div>
    );
}