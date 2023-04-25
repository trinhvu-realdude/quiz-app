import "./CertCard.css";

export default function CertCard({cert}) {
    return (
        <div className="cert-item m-4" style={{height: "420px"}}>
            <div className="card text-center" style={{
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
                        <button 
                            type="button" 
                            className="btn btn-outline-success" 
                            data-toggle="modal" 
                            data-target={`#modalTestCert${cert.id}`}
                            style={{width: "95px"}}
                        >
                            Test
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id={`modalTestCert${cert.id}`} tabIndex="-1" aria-labelledby={`modalTestCertLabel${cert.id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`modalTestCertLabel${cert.id}`}>{cert.name}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center">
                            Are you ready to take {cert.name} test?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <a href={`/test${cert.url}`}>
                                <button type="button" className="btn btn-primary">Yes, I'm ready</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}