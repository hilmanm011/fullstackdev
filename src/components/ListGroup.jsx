import React, { useEffect, useState } from 'react';
import axios from 'axios'
import List from './List'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ListGroup = () => {

    const searchQuery = useSelector((state)=>{
        return state.jobSearch.value
    })

    const { description, location, full_time } = searchQuery
    
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1)

    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        if (!token) {
            navigate('/')
        }
        fetchJobs().then((resdata) => {
            if (resdata.data) {
                const jobs = resdata.data.filter((item)=> !!item)
                setJobs(jobs);
            } else {
                setJobs([])
            }
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery,page]);

    const fetchJobs = async () => {
        try {
            const token = localStorage.getItem('auth-token')
            const query = {}
            if (page) {
                query.page = page
            }
            if (description) {
                query.description = description;
            }
            if (location) {
                query.location = location;
            }
            if (full_time) {
                query.full_time = full_time;
            }

            const response = await axios.get('http://localhost:5000/jobs/list', {
                headers: {
                    'auth-token': token,
                },
                params: query
            });
            const data = response.data.data;
            let result = []
            if (data) {
                result = data
            }
            return result
        } catch (error) {
            console.error('Error fetching jobs:', error);
            return [];
        }
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => prevPage - 1);
    };
    
    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div className='mb-5'>
            <ol className="list-group">
                <li className='list-group-item d-flex justify-content-start align-items-center'>
                    <h4 className='mt-2 mb-2 ms-2 me-auto fw-bold'>Jobs List</h4>
                </li>
                
                {jobs ? (
                    jobs.length === 0 ? (
                        <p className='text-center mt-4'>No jobs found.</p>
                    ) : (
                        
                        jobs.map((item) => {
                            return (
                                <List jobdata={item} key={item.id} />
                            );
                        })
                    )
                ) : (
                    <p className='text-center mt-4'>Loading..</p>
                )}
                
            </ol>
            <div className="pagination mt-3 d-flex justify-content-end align-items-center">
                <button
                className="btn btn-light btn-xs m-1"
                onClick={handlePreviousPage}
                disabled={page === 1}
                >
                Previous
                </button>
                {/* <span className="mx-2">Page {page}</span> */}
                <button
                className="btn btn-light btn-xs m-1"
                onClick={handleNextPage}
                disabled={!jobs || jobs.length === 0}
                >
                Next
                </button>
            </div>
        </div>
    )
}

export default ListGroup