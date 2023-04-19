import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCertsByExam } from "../../api/api";
import CertCard from "../CertCard/CertCard";
import Error from "../Error/Error";

export default function Cert() {
    const {exam} = useParams();

    document.title = `${exam.toUpperCase()} Certificates`;

    const [listCert, setListCert] = useState([]);

    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        getCertsByExam(exam)
        .then(data => {
            setListCert(data);
        })
        .catch(error => {
            console.error("Error retrieving certificates:", error);
            setErrorMessage("Sorry, no data found! We will update as soon as possible.")
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
            {
                errorMessage && (
                    <Error message={errorMessage} context={"Home"} />
                )
            }
        </div>
    );
}