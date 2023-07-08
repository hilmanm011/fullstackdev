import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'

const Detail = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [jobdata, setJobdata] = useState({})

  useEffect(() => {
      const token = localStorage.getItem('auth-token')
      if (!token) {
          navigate('/')
      }
      fetchJobDetail().then((resdata) => {
        setJobdata(resdata);
      });

  }, []);


  const fetchJobDetail = async()=>{
    try {
      const token = localStorage.getItem('auth-token')
      
      const response = await axios.get(`http://localhost:5000/jobs/detail/${id}`, {
          headers: {
              'auth-token': token,
          },
      });

      const data = response.data.data;
      return data
  } catch (error) {
      console.error('Error fetching jobs detail:', error);
      return {};
  }
  }
  const parsedDescription = <div dangerouslySetInnerHTML={{ __html: jobdata.description }} />;
  const parseHowToApply = <div dangerouslySetInnerHTML={{ __html: jobdata.how_to_apply }} />;

  return (

    

    <div className='container mt-2'>
        <Link to='/home' className='btn btn-outline-dark btn-sm mb-2'>BACK</Link>
        <div className="card p-3 mb-5">

          <div className="row ">
            <div className="col-12">
              <div className="header">
                <p className='m-0 text-muted'>{jobdata.type} / {jobdata.location}</p>
                <h3 className='fw-bold'>{jobdata.title}</h3>
              </div>
            </div>
            
          </div>
          <hr />

          <div className="row">
            <div className="col-md-8 mb-4">
              <div className="desc">
                {parsedDescription}

              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-2">
                <div className="card-header">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6>{jobdata.company}</h6>
                    <button className='btn btn-outline-dark btn-sm' disabled>1 offer job</button>
                  </div>
                </div>
                <div className="card-body">
                  <img src={jobdata.company_logo} alt={jobdata.company} />
                  <a href={jobdata.company_url} >{jobdata.company_url}</a>
                </div>
              </div>
              <div className="card">
                <h6 className="card-header">How To Apply</h6>
                <div className="card-body">
                  {parseHowToApply}
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Detail