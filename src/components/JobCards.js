import "./JobCards.css"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function JobCards ({ jobData, isEmployer }) {
  const jobId = jobData.id;
  const [status, setstatus] = useState()
  const [loading, setLoading] = useState(false)
  const {currentUser} = useAuth();

   useEffect(() => {
    const fetchData = async () => {
    const applicationRef =  doc(db, "jobcollection", jobId, "applications", currentUser.uid)
    const applicationSnap = await getDoc(applicationRef)
    setstatus(applicationSnap?.data()?.status)
  }
    fetchData();
  }, [])
  const handleApplyJob = async () => {
    setLoading(true)
      const employeeRef =  doc(db, "employeeProfile", currentUser.uid)
      const employeeSnap = await getDoc(employeeRef);
      console.log(employeeSnap.data())
      const applicationRef =  doc(db, "jobcollection", jobId, "applications", currentUser.uid)
  
      await setDoc(applicationRef ,{
        applicantName: employeeSnap.data().fullName,
        applicantEmail: employeeSnap.data().email,
        applicantUid: currentUser.uid,
        status: "pending",
      })
      .then(() => {
        toast.success("Applied Successfully")
        console.log("Application submitted");
      })
      .catch((error) => {
        toast.error("Create Profile First")
        console.error("Error submitting application: ", error);
      });
      setLoading(false)
    };
  
  return (
    
      <div className="job-card">
        <div className="job-card-header">
          <div className="company-logo"><img src={jobData.imageUrl} alt="" className="company-logo" /></div>
          
          <div className="menu-dot"></div>
        </div>
        <div className="job-card-title">{jobData.name}</div>
        <div className="job-card-subtitle">
          {jobData.description.slice(0, 115) + "..."}
          
        </div>
        <div className="job-detail-buttons">
          <button className="search-buttons detail-button">
            {jobData.jobType}
          </button>
          <button className="search-buttons detail-button">
            {jobData.location}
          </button>
          <button className="search-buttons detail-button">
            {jobData.jobRole}
          </button>
        </div>
        <div className="job-card-buttons">
          <button className="search-buttons card-buttons-msg"><Link className="whiteColorClass" to={`/jobs/${jobId}`}>View</Link></button>
          {!isEmployer ? <button className="search-buttons card-buttons" disabled={status || loading} onClick={handleApplyJob}>Apply{/*<Link to={`applyjob/${jobId}`}>
            Apply
            </Link>*/}
          </button> : ''}
        </div>
      </div>
    
  )
};

