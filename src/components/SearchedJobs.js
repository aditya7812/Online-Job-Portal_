import React, { useEffect, useState } from 'react';
import JobCards from "./JobCards";
import "./SearchedJobs.css"
import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';


export default function SearchedJobs({isEmployer}) {
  const [allCount, setAllCount] = useState(0)
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const jobRoles = ["Senior Level", "Mid Level", "Junior Level", "Entry Level"]
  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"]
  const [counts, setcounts] = useState([])
  const [typeCount, setTypeCount] = useState([])
  useEffect(() => {
    const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "jobcollection"));
      //const data = await db.collection('jobcollection').get();
      setAllJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

      let i=0,j=0,k=0,l=0;
      const tempcounts = []
      querySnapshot.docs.forEach((doc) => {
        if (doc.data().jobRole == "Senior") {
          i++;
        }
      })
      tempcounts.push(i)

      querySnapshot.docs.forEach((doc) => {
        if (doc.data().jobRole == "Mid") {
          j++;
        }
      })
      tempcounts.push(j)

      querySnapshot.docs.forEach((doc) => {
        if (doc.data().jobRole == "Junior") {
          k++;
        }
      })
      tempcounts.push(k)

      querySnapshot.docs.forEach((doc) => {
        if (doc.data().jobRole == "Entry") {
          l++;
        }
      })
      tempcounts.push(l)
      console.log(tempcounts)


      let w=0,x=0,y=0,z=0;
      const temptypecounts = []
      querySnapshot.docs.forEach((doc) => {
        if (doc.data().jobType == "Full-time") {
          w++;
        }
      })
      temptypecounts.push(w)

      querySnapshot.docs.forEach((doc) => {
        if (doc.data().jobType == "Part-time") {
          x++;
        }
      })
      temptypecounts.push(x)

      querySnapshot.docs.forEach((doc) => {
        if (doc.data().jobType == "Internship") {
          y++;
        }
      })
      temptypecounts.push(y)

      querySnapshot.docs.forEach((doc) => {
        if (doc.data().jobType == "Contract") {
          z++;
        }
      })
      temptypecounts.push(z)

      let allCount = 0;
      querySnapshot.docs.forEach((doc) => {
        allCount++;
      })

      setAllCount(allCount)

      setcounts(tempcounts)
      setTypeCount(temptypecounts)
      console.log('count: ', counts);
      
      

      //setJobs(querySnapshot.forEach((doc) => ({ ...doc.data(), id: doc.id})))
      //setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const handleAllClick = () => {
    setJobs(allJobs)
  }

  const handleRoleClick = (e) => {
    const getAllJobs = allJobs.filter(role => {
      if (role.jobRole == e ) return role
    })
    setJobs(getAllJobs)
  }

  const handleTypeClick = (e) => {
    const getAllJobs = allJobs.filter(role => {
      if (role.jobType == e ) return role
    })
    setJobs(getAllJobs)
  }
    return (
      <div className="main-container">
        <div className="search-type">
          <h3>No. of Jobs Available</h3>
          <div className='type-container' onClick={handleAllClick}>
          <div className="allJobsClass" >All</div>
          <div>{allCount}</div>
          </div>
            <div className="job-time">
              <div className="job-time-title">Seniority Level</div>
              <div className="job-wrapper">
              
                  <div className="type-container" key={jobRoles[0]} onClick={e => handleRoleClick(jobRoles[0].split(' ')[0])} >
                    <div >{jobRoles[0]} Jobs</div>
                    <div>{counts[0]}</div>
                  </div>
                  <div className="type-container" key={jobRoles[1]} onClick={e => handleRoleClick(jobRoles[1].split(' ')[0])} >
                    <div  >{jobRoles[1]} Jobs</div>
                    <div >{counts[1]}</div>
                  </div>
                  <div className="type-container" key={jobRoles[2]} onClick={e => handleRoleClick(jobRoles[2].split(' ')[0])} >
                    <div >{jobRoles[2]} Jobs</div>
                    <div>{counts[2]}</div>
                  </div>
                  <div className="type-container" key={jobRoles[3]} onClick={e => handleRoleClick(jobRoles[3].split(' ')[0])} >
                    <div value={jobRoles[3]} >{jobRoles[3]} Jobs</div>
                    <div value={jobRoles[3]}>{counts[3]}</div>
                  </div>
              </div>
            </div>
            <div className="job-time">
              <div className="job-time-title">Job Type</div>
                <div className="job-wrapper">
                  <div className="type-container" key={jobTypes[0]} onClick={e => handleTypeClick(jobTypes[0].split(' ')[0])} >
                    <div>{jobTypes[0]} Jobs</div>
                    <div>{typeCount[0]}</div>
                  </div>
                  
                  <div className="type-container" key={jobTypes[1]} onClick={e => handleTypeClick(jobTypes[1].split(' ')[0])} >
                    <div>{jobTypes[1]} Jobs</div>
                    <div>{typeCount[1]}</div>
                  </div>
                  <div className="type-container" key={jobTypes[2]} onClick={e => handleTypeClick(jobTypes[2].split(' ')[0])} >
                    <div>{jobTypes[2]} Jobs</div>
                    <div>{typeCount[2]}</div>
                  </div>
                  <div className="type-container" key={jobTypes[3]} onClick={e => handleTypeClick(jobTypes[3].split(' ')[0])} >
                    <div>{jobTypes[3]} Jobs</div>
                    <div>{typeCount[3]}</div>
                  </div>
                
              </div>
            </div>
          </div>

        <div className="searched-jobs">
          <div className="job-cards">
           {jobs.map((job) => (
              <JobCards key={job.id} jobData={job} isEmployer={isEmployer} />
            ))}
            </div>
            {/*<div className="searched-bar">
              <div className="searched-show">Showing 46 Jobs</div>
              <div className="searched-sort">
                Sort by: <span className="post-time">Newest Post </span
                ><span className="menu-icon">▼</span>
              </div>
    </div>
            <JobList/>*/}
        </div>
        </div>
    )
    
};
