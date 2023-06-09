import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';



const MainTemp = () => {
    const [jobsData, setJobsData] = useState([])
  const [jobTypes, setJobTypes] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);

  useEffect(() => {
    // fetch jobs data from Firebase on component mount
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "Newusers"));
      //const data = await db.collection('NewUsers').get();
      console.log(querySnapshot)
      setJobsData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
      // get unique job types and roles for filter options
      const uniqueJobTypes = [...new Set(querySnapshot.docs.map((job) => job.data().jobType))];
      setJobTypes(uniqueJobTypes);
      console.log(jobTypes)
      const uniqueJobRoles = [...new Set(querySnapshot.docs.map((job) => job.data().jobRole))];
      setJobRoles(uniqueJobRoles);
    };
    fetchData();
  }, []);

  const handleJobTypeChange = (event) => {

    const selectedJobType = event.target.value;
    if (event.target.checked) {
      setJobTypes([...jobTypes, selectedJobType]);
    } else {
      setJobTypes(jobTypes.filter(jobType => jobType !== selectedJobType));
    }
  };

  const handleJobRoleChange = (event) => {
    const selectedJobRole = event.target.value;
    if (event.target.checked) {
      setJobRoles([...jobRoles, selectedJobRole]);
    } else {
      setJobRoles(jobRoles.filter(jobRole => jobRole !== selectedJobRole));
    }
  };
  let filteredJobs = '';
  filteredJobs = jobsData.filter((job) => {
    const isJobTypeSelected = jobTypes.length === 0 || jobTypes.includes(job.jobType);
    const isJobRoleSelected = jobRoles.length === 0 || jobRoles.includes(job.jobRole);
    console.log("Hii")
    return isJobTypeSelected && isJobRoleSelected;
  });
  console.log(filteredJobs)

  return (
    <div>
      <h1>Job Listings</h1>
      <div>
        <h2>Filter by Job Type</h2>
        <label>
          <input type="checkbox" value="Full-time" onChange={handleJobTypeChange} />
          Full Time
        </label>
        <label>
          <input type="checkbox" value="Part-time" onChange={handleJobTypeChange} />
          Part Time
        </label>
        <label>
          <input type="checkbox" value="Contract" onChange={handleJobTypeChange} />
          Contract
        </label>
      </div>
      <div>
        <h2>Filter by Job Role</h2>
        <label>
          <input type="checkbox" value="Frontend Developer" onChange={handleJobRoleChange} />
          Frontend Developer
        </label>
        <label>
          <input type="checkbox" value="Backend Developer" onChange={handleJobRoleChange} />
          Backend Developer
        </label>
        <label>
          <input type="checkbox" value="Full Stack Developer" onChange={handleJobRoleChange} />
          Full Stack Developer
        </label>
      </div>
      <div>
        {filteredJobs.map((job) => (
          <div key={job.id}>
            <h3>{job.title}</h3>
            <p>Type: {job.jobType}</p>
            <p>Role: {job.jobRole}</p>
            <p>Description: {job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainTemp;
