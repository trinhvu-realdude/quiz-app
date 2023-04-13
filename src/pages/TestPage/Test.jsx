import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestByExam } from "../../api/api";

export default function Test() {

    const {exam, certificate} = useParams();

    const [listQuestionTest, setListQuestionTest] = useState([]);

    useEffect(() => {
        getTestByExam(exam, certificate)
        .then(data => {
            setListQuestionTest(data)
        })
    }, [exam, certificate]);

    console.log(listQuestionTest);

    return (
        <div>
            {exam} {certificate}
        </div>
    );
}

