import AnswerOption from "../Answer/AnswerOption";

export default function Question({ 
    currentQuestionIndex, 
    currentQuestion, 
    listQuestion,
    displayExplanations,
    setDisplayExplanations
}) {
    return (
        <div className="col-md-9 mt-2">
            <h3>Question {currentQuestionIndex + 1} of {listQuestion.length}:</h3>
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
            />
        </div>
    );
}