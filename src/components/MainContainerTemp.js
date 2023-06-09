import React, { useState, useEffect } from "react";
import Filter from "./Filter";

import { getJobs } from "../firebase";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import JobCards from "./JobCards";

const MainContainerTemp = () => {
  const [jobs, setJobs] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);

  useEffect(() => {
    // fetch jobs data from Firebase on component mount
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, "jobcollection"));
      //const data = await db.collection('jobcollection').get();
      console.log(querySnapshot)
      setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
      // get unique job types and roles for filter options
      const uniqueJobTypes = [...new Set(querySnapshot.docs.map((job) => job.data().jobType))];
      setJobTypes(uniqueJobTypes);
      console.log(jobTypes)
      const uniqueJobRoles = [...new Set(querySnapshot.docs.map((job) => job.data().jobRole))];
      setJobRoles(uniqueJobRoles);
    };
    fetchData();
  }, []);

  const handleFilterChange = (filters) => {
    let filteredJobs = jobs;
    // filter by selected job types
    if (filters.jobTypes.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filters.jobTypes.includes(job.jobType)
      );
    }
    // filter by selected job roles
    if (filters.jobRoles.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filters.jobRoles.includes(job.jobRole)
      );
    }
    console.log("Hii")
    setJobs(filteredJobs);
    console.log(jobs)
  };

  return (
    <div>
      <Filter jobTypes={jobTypes} jobRoles={jobRoles} onFilterChange={handleFilterChange} />
      <div>
        {jobs.map((job) => (
          <JobCards key={job.id} jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default MainContainerTemp;
