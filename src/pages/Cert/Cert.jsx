import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCertsByExam } from "../../api/api";
import CertCard from "../CertCard/CertCard";

export default function Cert() {
    const {exam} = useParams();

    document.title = `${exam.toUpperCase()} Certificates`;

    const [listCert, setListCert] = useState([]);

    useEffect(() => {
        getCertsByExam(exam)
        .then(data => {
            setListCert(data);
        })
    }, [exam]);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center collection">
                {
                    listCert && listCert.length > 0
                    ? listCert.map((cert, index) => (
                        <CertCard
                            key={index}
                            cert={cert}
                        />
                    ))
                    : null
                }
            </div>
        </div>
    );
}