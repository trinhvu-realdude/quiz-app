import './Answer.css';

export default function AnswerOption({
    answers, 
    explanations, 
    currentQuestionIndex,
    displayExplanations,
    setDisplayExplanations,
    correctSign, setCorrectSign,
    wrongSign, setWrongSign
}) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let index = 0;

    const isPracticePage = answers.some(e => {
        return e.isCorrect !== undefined ? true : false;
    })

    const generateIdAnswer = (originalId, alphabet) => {
        let clone = "";
        const fakeAlphabet = alphabet.substring(0, 16);
        for(let i = 0; i < originalId.length; i++) {
            clone += originalId[i];
            if(i % 2 === 0) {
                clone += fakeAlphabet[i / 2];
            }
        }
        if(fakeAlphabet.length > originalId.length / 2) {
            clone += fakeAlphabet.slice(originalId.length / 2);
        }
        return clone;
    }

    const handleSelectAnswerOption = (event, item) => {
        event.preventDefault();
        const input = document.querySelector(`input[id="${item.id}"]`);
        const answerOptionDiv = document.getElementById(generateIdAnswer(item.id, alphabet));
        if (input.checked === false) {
            answerOptionDiv.className = "custom-control custom-radio mb-2 pt-2 pb-2 alert-info d-flex justify-content-between"; 
        } else {
            answerOptionDiv.className = "custom-control custom-radio mb-2 pt-2 pb-2"; 
        }
        input.checked = !input.checked;
    }

    const handleSubmit = () => {
        const inputList = document.querySelectorAll("input");
        inputList.forEach(item => {
            const isCorrect = item.getAttribute("iscorrect");
            let checked = item.checked;

            if ((isCorrect === 'true' && checked) || isCorrect === 'true') {
                const correctAnswer = document.getElementById(generateIdAnswer(item.id, alphabet));
                correctAnswer.className = "custom-control custom-radio mb-2 pt-2 pb-2 alert-success d-flex justify-content-between";
                setCorrectSign(true);
            }

            if (checked && isCorrect === 'false') {
                const wrongAnswer = document.getElementById(generateIdAnswer(item.id, alphabet));
                wrongAnswer.className = "custom-control custom-radio mb-2 pt-2 pb-2 alert-danger d-flex justify-content-between";
                setWrongSign(true);
            }

            if (!checked && isCorrect === 'false') {
                const uncheckedAnswer = document.getElementById(generateIdAnswer(item.id, alphabet));
                uncheckedAnswer.style.opacity = "0.5";
            }
            document.getElementById(generateIdAnswer(item.id, alphabet)).classList.add("disabled");
        });
        setDisplayExplanations(true);
    }

    const handleReset = () => {
        const inputList = document.querySelectorAll("input");
        inputList.forEach(item => {
            const answers = document.getElementById(generateIdAnswer(item.id, alphabet));
            answers.className = "custom-control custom-radio mb-2 pt-2 pb-2";
            answers.style.opacity = "1";
            answers.classList.remove("disabled");
            setCorrectSign(false);
            setWrongSign(false);
            if (item.checked) {
                item.checked = false;
            }
        });
        setDisplayExplanations(false);
    }
      
    return (
        <form className="mb-4">
            <div className="form-check pl-0">
                {
                    answers && answers.length > 0
                    ? answers.map((item) => (
                        <div 
                            id={generateIdAnswer(item.id, alphabet)}
                            className="custom-control custom-radio mb-2 pt-2 pb-2 d-flex justify-content-between" 
                            key={item.id} 
                            onClick={(event) => handleSelectAnswerOption(event, item)}
                            style={{
                                cursor: "pointer",
                                borderRadius: "5px"
                            }}
                        >   
                            <input 
                                type="radio" 
                                className="custom-control-input" 
                                id={item.id} 
                                name={item.option} 
                                value={item.option} 
                                iscorrect={item.isCorrect} 
                                checked={item.checked}
                            />
                            <label 
                                className="custom-control-label ml-2" 
                                htmlFor={item.id}
                                style={{cursor: "pointer"}}
                            >
                                {
                                    alphabet.charAt(index++).toUpperCase() + ". " + item.option
                                }
                            </label>
                            {
                                correctSign && item.isCorrect === 'true' && (
                                    <button type="button" className="close mr-2" style={{fontSize: "16px"}}>
                                        <span>&#10003;</span>
                                    </button>
                                )
                            }
                            {
                                wrongSign && item.isCorrect === 'false' && document.querySelector(`input[id="${item.id}"]`).checked && (
                                    <button type="button" className="close mr-2">
                                        &times;
                                    </button>
                                )
                            }
                        </div>
                    ))
                    : null
                }
            </div>
            {
                displayExplanations && (
                    <div className="accordion mt-4 mb-4" id={`accordionExample-${currentQuestionIndex}`}>
                        <div className="card">
                            <div className="card-header" id={`headingOne-${currentQuestionIndex}`}>
                                <h2 className="mb-0">
                                <button 
                                    className="btn btn-link btn-block text-left" 
                                    type="button" 
                                    data-toggle="collapse" 
                                    data-target={`#collapse-target-${currentQuestionIndex}`} 
                                    aria-expanded="true" 
                                    aria-controls={`collapse-target-${currentQuestionIndex}`}
                                >
                                    Explanation
                                </button>
                                </h2>
                            </div>

                            <div 
                                id={`collapse-target-${currentQuestionIndex}`} 
                                className="collapse" 
                                aria-labelledby={`headingOne-${currentQuestionIndex}`} 
                                data-parent={`#accordionExample-${currentQuestionIndex}`}
                            >
                                <div className="card-body">
                                    {
                                        explanations.split("\n").map((explanation, index) => (
                                        <p key={index}>{explanation}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } 
            {
                isPracticePage && (
                    <div className="d-flex justify-content-center mt-4">
                        {/* Submit button */}
                        <button
                            type="button"
                            className="btn btn-info mx-2"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>

                        {/* Reset button */}
                        <button
                            type="button"
                            className="btn btn-danger mx-2"
                            onClick={() => handleReset()}
                        >
                            Reset
                        </button>
                    </div>        
                )
            }
        </form>
    );
}