import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";
import {collection, getDocs, query, where} from 'firebase/firestore';
import { db } from '../firebase';
import PostedJobCards from "./PostedJobCards";
import './JobCards.css'

export default function MyPostedJobs() {
    const [jobs, setJobs] = useState([]);
    const {currentUser} = useAuth()
    useEffect(() => {
    const fetchData = async () => {
    const q = query(collection(db, "jobcollection"), where("employer", "==", currentUser.uid));
    const querySnapshot = await getDocs(q);
    setJobs(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));  
    };
    fetchData();
  }, []);
    return (
        <>
        <Header isEmployer={true} />
        <div className="searched-jobs02">
          <div className="job-cards">
           {jobs.map((job) => (
        <PostedJobCards key={job.id} jobData={job} />
      ))}
      </div>
        </div>
        </>
    )
    
};

    

