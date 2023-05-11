import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const Ratings = ({user}) => {
    const [results, setResults] = useState([])
    console.log(results)

    useEffect(() => {
        (async function fetchResults() {
            try {
                const res = await fetch(`http://localhost:8000/api/ratings/?userid=${user.id}`)
                const data = await res.json()
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
                                    <li key={res.trainerId}>
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

export default Ratings;