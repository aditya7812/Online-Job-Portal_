import { useParams } from "react-router-dom"
import "./JobOverview.css"
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import jobBanner from './job-portal-banner.jpg'

export default function JobOverview() {
  const [requirements, setrequirements] = useState([])
  const {jobId} = useParams();
  console.log(jobId)
  const [job, setJob] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "jobcollection", jobId);
      const docSnap = await getDoc(docRef);
      setJob(docSnap.data());
      const tempreq = docSnap.data().requirement.split(".")
      if (tempreq.length > 1) {
      tempreq.pop()
    }
      setrequirements(tempreq)
    };
    fetchData();
  }, []);
    return (
        <div className="job-overview">
            
              <div className="job-explain">
                <img className="job-bg" alt="" src={jobBanner} />
                <div className="job-logos">
                  <img src={job.imageUrl} alt="" />
                </div>

                <div className="job-explain-content">
                  <div className="job-title-wrapper">
                    <div className="job-card-title">{job.name}
                    </div>
                  </div>

                  <div className="job-subtitle-wrapper">
                    <div className="company-name">
                      {job.companyName}
                    </div>
                  </div>

                  <div className="explain-bar">
                    <div className="explain-contents">
                      <div className="explain-title">Location</div>
                      <div className="explain-subtitle">{job.location}</div>
                    </div>
                    <div className="explain-contents">
                      <div className="explain-title">Work Level</div>
                      <div className="explain-subtitle">{job.jobRole} level</div>
                    </div>
                    <div className="explain-contents">
                      <div className="explain-title">Employee Type</div>
                      <div className="explain-subtitle">{job.jobType} Job</div>
                    </div>
                    <div className="explain-contents">
                      <div className="explain-title">Offer Salary</div>
                      <div className="explain-subtitle">${job.salary} / Month</div>
                    </div>
                  </div>
                  <div className="overview-text">
                    <div className="overview-text-header">Job Overview</div>
                    <div className="overview-text-subheader">
                      {job.description}
                    </div>
                  </div>
                  <div className="overview-text">
                    <div className="overview-text-header">Requirements</div>
                    {requirements ? 
                    requirements.map((requirement) => (
                      <div className="overview-text-item" key={requirement.slice(0, 20)}>
                        {requirement}
                        </div>
                    )) : ""}
                    
                  </div>
                </div>
              </div>
            </div>
    )
    
};
