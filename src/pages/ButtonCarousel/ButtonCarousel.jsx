import { useState } from "react";

export default function ButtonCarousel({ 
    listQuestionPractice,
    handleSelectQuestion, 
    currentQuestionIndex,
    setDisplayExplanations
}) {

    const [activeIndex, setActiveIndex] = useState(0);

    const itemsPerSlide = window.innerWidth <= 820 ? 20 : 40;
    const slides = listQuestionPractice ? Math.ceil(listQuestionPractice.length / itemsPerSlide) : 0;

    const handleSelect = (selectedIndex) => {
        setDisplayExplanations(false);
        setActiveIndex(selectedIndex);
    };


    const renderSlide = (startIdx) => {
        return (
            <div key={startIdx} className="container-fluid">
                {listQuestionPractice
                    .slice(startIdx, startIdx + itemsPerSlide)
                    .map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={`btn btn${item.id - 1 === currentQuestionIndex
                                ? " btn-info"
                                : " btn-outline-info"
                            } rounded-circle mx-1 my-1`}
                            style={{ 
                                width: "50px",
                                height: "50px",
                                fontSize: "14px"
                            }}
                            onClick={() => handleSelectQuestion(item)}
                        >
                            {item.id}
                        </button>
                    ))}
            </div>
        );
    };

    return (
        <div className="col-md-3 mb-2">
            <div id="carousel-control" className="carousel slide" data-interval="false">
                <div className="carousel-inner">
                {[...Array(slides)].map((_, i) => {
                    const startIdx = i * itemsPerSlide;
                    return (
                    <div
                        key={i}
                        className={`carousel-item ${i === activeIndex ? "active" : ""}`}
                        onClick={() => handleSelect(i)}
                    >
                        {renderSlide(startIdx)}
                    </div>
                    );
                })}
                </div>
            </div>
            {
                listQuestionPractice && listQuestionPractice.length > 0 && (
                    <div className="d-flex justify-content-center mt-3">
                        <button
                            className="btn btn-light mr-3"
                            onClick={() =>
                                handleSelect(
                                    activeIndex === 0 ? slides - 1 : activeIndex - 1
                                )
                            }
                            style={{fontSize: "18px"}}
                        >
                            &larr;
                        </button>
                        <button
                            className="btn btn-light"
                            onClick={() =>
                                handleSelect(
                                    activeIndex === slides - 1 ? 0 : activeIndex + 1
                                )
                            }
                            style={{fontSize: "18px"}}
                        >
                            &rarr;
                        </button>
                    </div>
                )
            }
        </div>
    );

}