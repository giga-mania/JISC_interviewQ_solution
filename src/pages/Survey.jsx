import React, {useEffect, useState} from 'react';

const Survey = ({user}) => {
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        try {
            (async function fetchQuestion() {
                const response = await fetch("http://localhost:8000/api/questions")
                const data = await response.json()
                setQuestions(data)
            })()
        } catch (e) {
            console.log(e)
        }
    }, [])


    const handleInputChange = (e) => {
        const current = {question: e.target.name, answer: e.target.id.split("-")[1] === "yes"}
        const isAlready = answers.find((answer) => answer.question === e.target.name)
        if (isAlready) {
            setAnswers([...answers.filter(answer => answer.question !== e.target.name), current])
            return
        }
        setAnswers([...answers, current])
    }


    const submitHandler = async () => {
        if (answers.length < 10) alert("You must answer all questions")

        const response = await fetch("http://localhost:8000/api/answers/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({userAnswers: answers, userId: user.id})
        })
        return await response.json()

    }


    return (
        <div css={{
            margin: "auto",
            width: "70%",
            border: "2px solid green",
            padding: "10px",
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            "> ul": {
                width: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "> li": {
                    listStyle: "none"
                }
            }
        }}>
            <h1>Answer the question to find a trainer best fits to you!</h1>
            <h3>Smile! Relax! Don't rush! Feel the tempo and everything 'll come to the bright.</h3>
            <ul>
                {
                    questions?.map(({question, id}) => (
                        <li key={id} css={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}>
                            <p>{question}</p>
                            <div>
                                <label htmlFor={`${id}-yes`}>
                                    Yes
                                    <input type="radio" name={id} id={`${id}-yes`} onChange={handleInputChange}/>
                                </label>
                                <br/>
                                <label htmlFor={`${id}-no`}>
                                    No
                                    <input type="radio" name={id} id={`${id}-no`} onChange={handleInputChange}/>
                                </label>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <br/>
            <br/>
            <button onClick={submitHandler}>Submit</button>
        </div>
    );
};

export default Survey;