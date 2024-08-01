import { useLocation } from "react-router-dom";
import Question from "../../components/Question/Question";

export default function Result() {
    const { checkedAnswers } = useLocation().state;

    console.log(checkedAnswers);

    return (
        <div className="container d-flex justify-content-center">
            <Question listQuestion={checkedAnswers} />
        </div>
    );
}
