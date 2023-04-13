export default function ExamCard({exam}) {
    return (
        <div className="exam-item" style={{
            margin: "20px"
        }}>
            <div className="card text-center" style={{
                width: "18rem"
            }}>
                <img
                    src={exam.sourceLogo} 
                    alt={exam.name} 
                    style={{
                        aspectRatio: "3/2",
                        objectFit: "contain"
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{exam.name}</h5>
                    <div className="row">
                        <p className="col-sm-6 card-text">
                            <i style={{fontSize: "14px"}} className='fas'>&#xf559;</i> {exam.numberOfExams}
                        </p>
                        <p className="col-sm-6 card-text">
                            <i style={{fontSize: "14px"}} className='fas'>&#xf518;</i> {exam.numberOfQuestions}
                        </p>
                    </div>
                    <a href={exam.url}>
                        <button type="button" className="btn btn-outline-info">
                            Go to {exam.name.substring(0, 1).toUpperCase() + exam.name.substring(1,).toLowerCase()}
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}