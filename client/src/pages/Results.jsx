import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Results = ({user}) => {
    const [results, setResults] = useState([])
    console.log(results)

    useEffect(() => {
        (async function fetchResults() {
            try {
                const res = await fetch(`http://localhost:8000/api/results/?userid=${user.id}`)
                const data = await res.json()
                console.log("___", data)
                setResults(data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])

    return (
        <div>
            {
                user.hasAnswered ?
                    <div>
                        <h1>Here is your result</h1>
                        <ul>
                            {
                                results.map((res) => (
                                    <li>
                                        <h3>Trainer: #{res.trainerId} -- Match {(100 * res.point) / 10}%</h3>
                                    </li>
                                ))
                            }
                        </ul>
                    </div> :
                    <div>
                        <h1>No Rating to Display!</h1>
                        <h4>Go to <Link to="/answer-questions">answer question</Link></h4>
                    </div>
            }
        </div>
    );
};

export default Results;