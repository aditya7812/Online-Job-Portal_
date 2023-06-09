import React, { useState, useEffect } from 'react';
import './UserProfile.css'
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateJobs = () => {
  const [job, setJob] = useState();
  const [companyName, setCompanyName] = useState();
  const [name, setName] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [description, setDescription] = useState('');
  const [requirement, setRequirement] = useState('')
  const [loading, setloading] = useState(true)

  const navigate = useNavigate();
   const {jobId} = useParams()


   useEffect(() => {
    const fetchData = async () => {
    const querySnapshot = await getDoc(doc(db, "jobcollection", jobId));
   
      //const data = await db.collection('jobcollection').get();
      console.log(querySnapshot.data())
      setJob(querySnapshot.data())
      setloading(false);
      setCompanyName(querySnapshot.data().companyName)
      setName(querySnapshot.data().name)
      setJobType(querySnapshot.data().jobType)
      setJobRole(querySnapshot.data().jobRole)
      setLocation(querySnapshot.data().location)
      setSalary(querySnapshot.data().salary)
      setDescription(querySnapshot.data().description)
      setRequirement(querySnapshot.data().description)
      
    };
    fetchData();
  }, []);

  
  const handlecompanyNameChange = (event) => {
    setCompanyName(event.target.value)
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleJobRoleChange = (event) => {
    setJobRole(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleRequirementChange = (event) => {
    setRequirement(event.target.value);
  };

  const handleDeleteJob = async (event) => {
    try {
      await deleteDoc(doc(db, "jobcollection", jobId));
      toast.success("Job Deleted Successfully")
      navigate(-1)
    } catch (error) {
      console.error(error)
      toast.error("An Error Occured")
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jobData = {
      companyName,
      name,
      jobType,
      salary,
      location,
      jobRole,
      description,
      requirement
    };
    try {
      const docRef = await updateDoc(doc(db, "jobcollection", jobId), {
        ...jobData,
      });
      toast.success("Job Updated Successfully")
      navigate(-1)
  
    } catch (error) {
      console.error(error)
      toast.error("An Error Occured")
      
    }
  };

  return ( 
    <>
    {!loading ? 
    <div className='main-container2'>
    <div className="container3">
    
      <form onSubmit={handleSubmit} className='form2'>
        <div className="column">
            <div className="input-box">
                <label htmlFor='companyname'>Company Name</label>
                <input id='companyname' type="text" value={companyName} onChange={handlecompanyNameChange} required />
            </div>
            <div className="input-box">
                <label htmlFor='title'>Job Title</label>
                <input id='title' type="text" value={name} onChange={handleNameChange} required />
            </div>
          </div>
        <div className="column">
          <div className="input-box">
                <label htmlFor='jobType'>Job Type</label>
                <select id='jobType' type="text" value={jobType} onChange={handleJobTypeChange} required >
                  <option value="">Select a job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
            </div>
            <div className="input-box">
                <label htmlFor='jobRole'>Job Role</label>
                <select id='jobRole' type="text" value={jobRole} onChange={handleJobRoleChange} required >
                  <option value="">Select a job level</option>
                  <option value="Senior">Senior</option>
                  <option value="Mid">Mid</option>
                  <option value="Junior">Junior</option>
                  <option value="Entry">Entry</option>
                </select>
            </div>
          </div>

          <div className="column">
            <div className="input-box">
                <label htmlFor='salary'>Salary</label>
                <input id='salary' type="number" value={salary} onChange={handleSalaryChange} required />
            </div>
            <div className="input-box">
                <label htmlFOr='location'>Location</label>
                <input id='loction' type="text" value={location} onChange={handleLocationChange} required />
            </div>
          </div>
  
      <label htmlFor='description'>
        Description:
        <textarea id='description' rows="3" style={{width : "100%"}} value={description} onChange={handleDescriptionChange} required/>
      </label>
      <label htmlFor='requirement'>
        Requirement:
        <textarea id='requirement' rows="3" style={{width : "100%"}} value={requirement} onChange={handleRequirementChange} required/>
      </label>
      <div className="column">
      <button type="submit">Update Job</button>
      <button onClick={handleDeleteJob} className="deleteJobBtn" type="button">Delete Job</button>
      </div>
    </form>
    
    </div>
  </div>
    : ""}
    </>
  )
};

export default UpdateJobs;
