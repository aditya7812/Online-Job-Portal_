import { db } from "../firebase"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function ListApplicantsCard({jobData, jobId}) {
    const [application, setapplication] = useState('')
    const [status, setStatus] = useState()
    const [loading, setloading] = useState(true)
    
    useEffect(() => {
      const fetchData = async () => {
        const applicationRef =  doc(db, "jobcollection", jobId, "applications", jobData.id)
        const applicationSnap = await getDoc(applicationRef)
        console.log(applicationSnap.data())
        setapplication(applicationSnap.data())
        setStatus(applicationSnap.data().status)
        setloading(false)
      }
      fetchData()
    }, [])

    const handleStatusChange = async (jobId, applicantId, newStatus) => {
      const applicationRef =  doc(db, "jobcollection", jobId, "applications", jobData.id)
      await updateDoc(applicationRef, {
        status: newStatus,
      })
      setStatus(newStatus)
    }
    
    return (
        <tr>{!loading ?
          <>
            <td>{jobData.applicantName}</td>
            <td>{jobData.applicantEmail}</td>
            <td><Link className="profileLink" to={`/users/${jobData.id}`}>Profile</Link></td>
            <td>{ application.status == "pending" ?
            <>
              <button
                      onClick={() =>
                        handleStatusChange(jobId, jobData.id, "Accepted")
                      }
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        handleStatusChange(jobId, jobData.id, "Rejected")
                      }
                    >
                      Reject
                    </button> </> : status}</td></> : 'Loading'
        }</tr>
    )
    
};
