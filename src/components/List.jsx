import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';

const List = (props) => {
    const { jobdata } = props
    
    const formatCreatedAt = (createdAt) => {
        const now = moment();
        const created = moment(createdAt);
    
        const yearsDiff = now.diff(created, 'years');
        const monthsDiff = now.diff(created, 'months');
    
        if (yearsDiff === 1) {
            return '1 year ago';
        } else if (yearsDiff > 1) {
            return `${yearsDiff} years ago`;
        } else if (monthsDiff === 1) {
            return '1 month ago';
        } else if (monthsDiff > 1) {
            return `${monthsDiff} months ago`;
        } else {
            const daysDiff = now.diff(created, 'days');
            if (daysDiff === 0) {
                return 'Today';
            } else if (daysDiff === 1) {
                return '1 day ago';
            } else {
                return `${daysDiff} days ago`;
            }
        }
    };

    return (
        <Link to={`/detail/${jobdata.id}`} className="no-underline">

            <li className="list-group-item list-jobs">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{jobdata.title}</div>
                    </div>
                    <small>{jobdata.location}</small>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="ms-2 me-auto">
                        <div className="text-muted small">{jobdata.company} - <span className='fw-bold text-success'>{jobdata.type}</span></div>
                    </div>
                    <small className='text-muted'>{formatCreatedAt(jobdata.created_at)}</small>
                </div>
            </li>
        
        </Link>
    )
}

export default List