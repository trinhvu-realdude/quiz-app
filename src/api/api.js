const BASE_URL = "http://localhost:5000/api/v1";

export const getAllExams = async () => {
    const response = await fetch(BASE_URL + "/getAllExams");
    const result = await response.json();
    return result.data;
}

export const getCertsByExam = async (exam) => {
    const response = await fetch(BASE_URL + "/getCertsByExam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            exam
        })
    });
    const result = await response.json();
    return result.data;
}

export const getPracticeByCert = async (exam, certificate) => {
    const response = await fetch(BASE_URL + "/getPracticeByCert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            exam,
            certificate
        })
    });
    const result = await response.json();
    return result.data;
}

export const getTestByExam = async (exam, certificate) => {
    const response = await fetch(BASE_URL + "/getTestByExam", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            exam,
            certificate
        })
    });
    const result = await response.json();
    return result.data;
}
