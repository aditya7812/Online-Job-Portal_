import { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  
  const { currentUser } = useAuth()
  useEffect( () => {
    const unsubscribe = async () => {
        
        console.log(currentUser)
        const q = query(collection(db, 'jobcollection'), where('companyName', '==', 'abc'))

const querySnapshot = await getDocs(q);
const getJobs = []
setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

  // doc.data() is never undefined for query doc snapshots

        //const querySnapshot = await getDocs(collection(db, "jobcollection",), where('employerId', '==', currentUser));
        
         /*const querySnapshot = await getDocs(q)
         console.log(querySnapshot)
         setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
         
          */
        console.log(jobs)
        
      }

    unsubscribe();
  }, []);

  const handleStatusChange = (jobId, applicantId, newStatus) => {
    
      db.collection("jobs")
      .doc(jobId)
      .collection("applicants")
      .doc(applicantId)
      .update({ status: newStatus })
      .then(() => {
        console.log("Application status updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating application status: ", error);
      });
  };

  return (
    <div>
      <h2>My Jobs</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Job Type</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Job Role</th>
            <th>Description</th>
            <th>Applicants</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.map((job) => (
            <tr key={job.id}>
              <td>{job.name}</td>
              <td>{job.jobType}</td>
              <td>{job.salary}</td>
              <td>{job.location}</td>
              <td>{job.jobRole}</td>
              <td>
                {job.applicants?.map((applicant) => (
                  <div key={applicant.id}>
                    {applicant.name} - {applicant.status}
                    <button
                      onClick={() =>
                        handleStatusChange(job.id, applicant.id, "Accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(job.id, applicant.id, "Rejected")
                      }
                    >
                      Reject
                    </button>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
