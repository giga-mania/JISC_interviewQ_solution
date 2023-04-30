import React, {useEffect, useState} from 'react';

const Profile = () => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        try {
            (async function fetchQuestion() {
                const response = await fetch("http://localhost:8080/api/questions")
                const data = await response.json()
                setQuestions(data)
            })()
        } catch (e) {
            console.log(e)
        }

    }, [])

    return (
        <div>
            <h1>This is profile page!!!!!</h1>
            <ul>
                {
                    questions?.map(({question, id}) => (
                        <li key={id}>{question}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Profile;