import React from 'react';
import {Link} from "react-router-dom";

const Results = () => {
    return (
        <div>
            <h1>No Rating to Display!</h1>
            <h4>Go to <Link to="/answer-questions">answer question</Link></h4>
        </div>
    );
};

export default Results;