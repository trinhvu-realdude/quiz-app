export default function AnswerOption({answer}) {
    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                name={answer.option}
                id={answer.id}
                value={answer.isCorrect}
            />
            <label className="form-check-label" htmlFor="exampleRadios1">
                {answer.option}
            </label>
        </div>
    );
}