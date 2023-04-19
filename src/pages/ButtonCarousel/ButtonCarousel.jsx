import { useState } from "react";

export default function ButtonCarousel({ listQuestionPractice, handleSelectQuestion , currentQuestionIndex }) {

    const [activeIndex, setActiveIndex] = useState(0);

    const itemsPerSlide = 40;
    const slides = listQuestionPractice ? Math.ceil(listQuestionPractice.length / itemsPerSlide) : 0;

    const handleSelect = (selectedIndex, e) => {
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
                            }`}
                            style={{ width: "52px" }}
                            onClick={() => handleSelectQuestion(item)}
                        >
                            {item.id}
                        </button>
                    ))}
            </div>
        );
    };

    return (
        <div className="col-md-3">
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
                        >
                            &rarr;
                        </button>
                    </div>
                )
            }
        </div>
    );

}