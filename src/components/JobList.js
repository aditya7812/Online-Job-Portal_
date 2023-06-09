import React, { useEffect, useState } from 'react';
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';
import JobCards from './JobCards'

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "jobcollection"));
      setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  return (
    <>
      {jobs.map((job) => (
        <JobCards key={job.id} jobData={job} />
      ))}
    </>
  );
};

export default JobList;
