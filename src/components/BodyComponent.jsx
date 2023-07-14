import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchQuery } from '../features/job';
import Profile from './Profile';


const BodyComponent = () => {
  const dispatch = useDispatch()
  
  const [isChecked, setIsChecked] = useState(false);
  const [searchJobDesc, setSearchJobDesc] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  const handleCheckboxChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  const onChangeSearchJob = (e)=>{
    setSearchJobDesc(e.target.value)
  }

  const onChangeSearchLocation = (e)=>{
    setSearchLocation(e.target.value)
  }

  const submitSearch = (e)=>{
    e.preventDefault();
    const query = {}
    if (searchJobDesc) {
      query.description = searchJobDesc
    }
    if (searchLocation) {
      query.location = searchLocation
    }

    if (isChecked) {
      query.full_time = isChecked
    }

    dispatch(searchQuery(query))
  }

  return (
    
    <>
        <Profile />

        <div className="mb-3 mt-4 d-flex flex-wrap justify-content-between align-items-center col-md-12">
          <div className="col-4 me-1">
              <label className="form-label fw-bold">Job Description</label>
              <input 
              type="text" 
              className="form-control" 
              placeholder="Filter by title, benefits, companies, expertise" 
              onChange={onChangeSearchJob}
              value={searchJobDesc}
              />
          </div>
          <div className="col-4 me-1">
              <label className="form-label fw-bold">Location</label>
              <input 
              type="text" 
              className="form-control" 
              placeholder="Filter by city, state, zipcode or country" 
              onChange={onChangeSearchLocation}
              value={searchLocation}
              />
          </div>
          <div className="col-lg m-auto">
            <div className="d-flex justify-content-between align-items-center mt-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkboxFulltimeOnly"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label fw-bold me-2" htmlFor="checkboxFulltimeOnly">
                  Full Time Only
                </label>
              </div>
              <button className='btn btn-primary btn-xs' onClick={submitSearch}>Search</button>
            </div>
          </div>
        </div>
        
    </>
  )
}

export default BodyComponent