import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { getDoc, query,collectionGroup, where, getDocs } from "firebase/firestore";
import ListApplications from "./ListApplications";
import Header from "./Header";

const JobPosting = () => {
  const [loading, setloading] = useState(true)
  const [jobs, setJobs] = useState();
  const [id, setId] = useState([]);
  
  const {currentUser} = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const posts = query(collectionGroup(db, 'applications'), where('applicantUid', '==', currentUser.uid));
      const querySnapshot = await getDocs(posts);
      
      let arr = [];
      querySnapshot.docs.forEach(async (doc) => {
        const docRef =  doc.ref; 
        arr.push(docRef.parent.parent) 
      });
      
      const sec = [];
      const secId = []
      for (let i=0;i<arr.length;i++) {
        const tempjob = await getDoc(arr[i])
        secId.push(tempjob.id)
        sec.push(tempjob.data())
      }

      setJobs(sec)
      setId(secId)         
      setloading(false)
    };
    fetchData();
  }, []);

  return (
    <>
            <Header/>
            <div className="table-container">
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Post</th>
                            <th>Location</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!loading ? 
                      Object.keys(jobs).map(key1 => 
                      <ListApplications key={key1} jobData={jobs[key1]} jobId={id[key1]} /> )
      
                    : ""}
                    </tbody>
                </table>
            </div>
        </>
    
    
  );
};

export default JobPosting;
