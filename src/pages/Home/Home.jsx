import { useEffect, useState } from "react";
import { getAllExams} from "../../api/api";
import "./Home.css";
import ExamCard from "../ExamCard/ExamCard";

export default function Home() {

    const [listExam, setListExam] = useState([]);

    useEffect(() => {
        getAllExams().then(data => {setListExam(data)})
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center collection">
                {
                    listExam && listExam.length > 0
                    ? listExam.map((exam, index) => (
                        <ExamCard
                            key={index}
                            exam={exam}
                        />
                    ))
                    : null
                }
            </div>
        </div>
    );
}