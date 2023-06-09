import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore"; 
import Header from "./Header";
import ListApplicantsCard from "./ListApplicantsCard";
import './ListApplicants.css'

export default function ListApplicants() {
    const {jobId} = useParams()
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "jobcollection", jobId, 'applications'));
        console.log(querySnapshot)
        setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        console.log(jobs)
      };
      fetchData();
    }, []);

    return (
        <>
            <Header isEmployer={true}/>
            <div className="table-container">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Profile</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job) => (
        <ListApplicantsCard key={job.id} jobData={job} jobId={jobId} />
        ))}
                    </tbody>
                </table>
            </div>
        </>


    )
    

    
};
