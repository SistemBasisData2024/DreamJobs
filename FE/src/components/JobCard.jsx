import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <div className="job-card">
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <Link to={`/jobs/${job._id}`}>View Details</Link>
        </div>
    );
};

export default JobCard;
