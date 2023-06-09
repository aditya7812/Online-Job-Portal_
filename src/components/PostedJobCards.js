import "./JobCards.css"
import { Link } from "react-router-dom"


export default function PostedJobCards ({ jobData }) {
  const jobId = jobData.id;
  return (
      <div className="job-card">
        <div className="job-card-header">
        <div className="company-logo"><img src={jobData.imageUrl} alt="" className="company-logo" /></div>  
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
          <button className="search-buttons card-buttons"><Link className="whiteColorClass" to={`jobs/${jobId}`}>Update</Link></button>
          <button className="search-buttons card-buttons-msg" ><Link to={`${jobId}`} >See Applicants
           </Link>
          </button>
        </div>
      </div>
    
  )
};

