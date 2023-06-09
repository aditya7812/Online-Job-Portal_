import React, { useState } from 'react';
import './JobPost.css'
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';
import { v4 } from 'uuid';

const JobPost = () => {
  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState();
  const [location, setLocation] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [description, setDescription] = useState('');
  const [requirement, setRequirement] = useState('');
  const [jobLogo, setJobLogo] = useState('')
  const {currentUser} = useAuth();
  const navigate = useNavigate();
  
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

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setJobLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const imageRef = ref(storage, `logos/${jobLogo.name + v4()}`)
    const imageSnap = !jobLogo ? null :await uploadBytes(imageRef, jobLogo)
    const imageUrl = !imageSnap ? null : await getDownloadURL(imageSnap?.ref)
    const jobData = {
      companyName,
      name,
      jobType,
      salary,
      location,
      jobRole,
      imageUrl,
      description,
      requirement
    };
    try {
      
      const docRef = await addDoc(collection(db, "jobcollection"), {
        ...jobData,
        'employer': currentUser.uid
      });
      toast.success("Job Posted Successfully")
      navigate(-1)
  
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error)
      toast.error("An Error Occured")
      
    }
  };

  return (
    <div className='main-container2'>
    <div className="container3">
    
      <form onSubmit={handleSubmit} className='form2'>
        <div className="column">
            <div className="input-box">
                <label htmlFor='companyName'>Company Name</label>
                <input id='companyName' type="text" value={companyName} onChange={handlecompanyNameChange} required />
            </div>
            <div className="input-box">
                <label htmlFor='jobTitle'>Job Title</label>
                <input id='jobTitle' type="text" value={name} onChange={handleNameChange} required />
            </div>
          </div>
        <div className="column">
          <div className="input-box">
                <label htmlFor='jobType' >Job Type</label>
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
                <select id='jobRole'type="text" value={jobRole} onChange={handleJobRoleChange} required >
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
                <label htmlFor='location'>Location</label>
                <input id='location'type="text" value={location} onChange={handleLocationChange} required />
            </div>
          </div>
          <div className="input-box">
            <label htmlFor='logo'>Upload Company Logo</label>
            <input id='logo' className="filebox" type="file" onChange={handleImageChange} />
          </div>
  
      <label htmlFor='description'>
        Description:
        <textarea id='description'rows="3" style={{width : '100%'}} value={description} onChange={handleDescriptionChange} required/>
      </label>
      <label htmlFor='requirement'>
        Requirement:
        <textarea id='requirement' rows="3" style={{width : "100%"}} value={requirement} onChange={handleRequirementChange} required/>
      </label>
      <button type="submit">Post Job</button>
    </form>
    </div>
  </div>

    /*<form onSubmit={handleSubmit} className='job-form'>
      <label>
        Company Name:
        <input type="text" value={companyName} onChange={handlecompanyNameChange} required />
      </label>
      <label>
        Job Title:
        <input type="text" value={name} onChange={handleNameChange} required/>
      </label>
      <label>
        Job Type:
        <select value={jobType} onChange={handleJobTypeChange} required>
          <option value="">Select a job type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
        </select>
      </label>
      <label>
        Salary:
        <input type="number" value={salary} onChange={handleSalaryChange} required />
      </label>

      <label>
        Location:
        <input type="text" value={location} onChange={handleLocationChange} required />
      </label>
      <label>
        Job Level:
        <select value={jobRole} onChange={handleJobRoleChange} required>
          <option value="">Select a job level</option>
          <option value="Full-time">Senior</option>
          <option value="Part-time">Mid</option>
          <option value="Contract">Junior</option>
          <option value="Internship">Entry</option>
        </select>
        
      </label>
      <label>
        Description:
        <textarea value={description} onChange={handleDescriptionChange} required/>
      </label>
      <button type="submit">Post Job</button>
  </form>*/
  );
};

export default JobPost;
