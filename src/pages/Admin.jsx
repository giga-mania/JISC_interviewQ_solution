// noinspection DuplicatedCode

import React, {useEffect, useState} from 'react';

const Admin = () => {
    const [trainerName, setTrainerName] = useState("")
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])
    const [onSubmitSuccess, setOnSubmitSuccess] = useState(false)

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
        try {
            const res = await fetch("http://localhost:8000/api/answers/trainer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ trainerName, trainerAnswers: answers})
            })
            if (res.ok) {
                setOnSubmitSuccess(true)
            }
            const data = res.json()
        } catch (err) {
            console.log(err)
        }
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
            {
                onSubmitSuccess ? <div>Trainer added successfully</div> : <>
                    <input value={trainerName} onChange={(e) => setTrainerName(e.target.value)}
                           placeholder="Trainer name"/>
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
                                            <input type="radio" name={id} id={`${id}-yes`}
                                                   onChange={handleInputChange}/>
                                        </label>
                                        <br/>
                                        <label htmlFor={`${id}-no`}>
                                            No
                                            <input type="radio" name={id} id={`${id}-no`}
                                                   onChange={handleInputChange}/>
                                        </label>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                    <button onClick={submitHandler}>Submit</button>
                </>
            }
        </div>
    );
};

export default Admin;