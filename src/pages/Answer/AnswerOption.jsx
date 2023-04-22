export default function AnswerOption({
    answers, 
    explanations, 
    currentQuestionIndex,
    displayExplanations,
    setDisplayExplanations
}) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    let index = 0;

    const generateIdAnswer = (originalId, alphabet) => {
        let clone = "";
        for(let i = 0; i < originalId.length; i++) {
            clone += originalId[i];
            if(i % 2 === 0) {
                clone += alphabet[i / 2];
            }
        }
        if(alphabet.length > originalId.length / 2) {
            clone += alphabet.slice(originalId.length / 2);
        }
        return clone;
    }
      
    return (
        <form className="mb-4">
            <div className="form-check">
                {
                    answers && answers.length > 0
                    ? answers.map((item) => (
                        <div 
                            id={generateIdAnswer(item.id, alphabet)}
                            className="custom-control custom-radio mb-2 pt-2 pb-2" 
                            key={item.id} 
                            onClick={(event) => {
                                event.preventDefault();
                                const input = document.querySelector(`input[id="${item.id}"]`);
                                input.checked = !input.checked;
                            }}
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
                                className="custom-control-label" 
                                htmlFor={item.id}
                                style={{cursor: "pointer"}}
                            >
                                {alphabet.charAt(index++).toUpperCase() + ". " + item.option}
                            </label>
                        </div>
                    ))
                    : null
                }
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button
                    type="button"
                    className="btn btn-info mx-2"
                    onClick={() => {
                        const inputList = document.querySelectorAll("input");
                        inputList.forEach(item => {
                            const isCorrect = item.getAttribute("iscorrect");
                            let checked = item.checked;

                            if ((isCorrect === 'true' && checked) || isCorrect === 'true') {
                                document.getElementById(generateIdAnswer(item.id, alphabet)).className = "custom-control custom-radio mb-2 pt-2 pb-2 bg-success text-white";
                            } 

                            if (checked && isCorrect === 'false') {
                                document.getElementById(generateIdAnswer(item.id, alphabet)).className = "custom-control custom-radio mb-2 pt-2 pb-2 bg-danger text-white";
                            }
                        })

                        setDisplayExplanations(true);
                    }}
                >
                    Submit
                </button>
                <button 
                    type="button"
                    className="btn btn-danger mx-2"
                    onClick={() => {
                        const inputList = document.querySelectorAll("input");
                        inputList.forEach(item => {
                            document.getElementById(generateIdAnswer(item.id, alphabet)).className = "custom-control custom-radio mb-2 pt-2 pb-2";
                            if (item.checked) {
                                item.checked = false;
                            }
                        })

                        setDisplayExplanations(false);
                    }}
                >
                    Reset
                </button>
            </div>
            {
                displayExplanations && (
                    <div className="accordion mt-4 mb-4" id={`accordionExample-${currentQuestionIndex}`}>
                        <div className="card">
                            <div className="card-header" id={`headingOne-${currentQuestionIndex}`}>
                                <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target={`#collapse-target-${currentQuestionIndex}`} aria-expanded="true" aria-controls={`collapse-target-${currentQuestionIndex}`}>
                                    Explanation
                                </button>
                                </h2>
                            </div>

                            <div id={`collapse-target-${currentQuestionIndex}`} className="collapse" aria-labelledby={`headingOne-${currentQuestionIndex}`} data-parent={`#accordionExample-${currentQuestionIndex}`}>
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
        </form>
    );
}