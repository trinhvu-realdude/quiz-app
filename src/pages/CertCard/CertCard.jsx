import "./CertCard.css";

export default function CertCard({cert}) {
    return (
        <div 
            className="cert-item" 
            style={{
                margin: "20px",
                height: "420px"
            }}
        >
            <div 
                className="card text-center" 
                style={{
                    width: "18rem",
                    height: "420px"
                }}
            >
                <img
                    src={cert.sourceLogo} 
                    alt={cert.name} 
                    style={{
                        aspectRatio: "3/2",
                        objectFit: "contain"
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{cert.name}</h5>
                    <p className="card-text">
                        <i style={{fontSize: "14px"}} className='fas'>&#xf518;</i> {cert.numberOfQuestions}
                    </p>
                </div>
                <div className="row mb-4">
                    <div className="col-sm-6">
                        <a href={`/practice${cert.url}`}>
                            <button type="button" className="btn btn-outline-info" style={{width: "95px"}}>
                                Practice
                            </button>
                        </a>
                    </div>
                    <div className="col-sm-6">
                        <a href={`/test${cert.url}`}>
                            <button type="button" className="btn btn-outline-success" style={{width: "95px"}}>
                                Test
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}