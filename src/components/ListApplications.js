import { useAuth } from "../contexts/AuthContext"
import { db } from "../firebase" 
import { doc,getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
export default function ListApplications({jobData, jobId}) {
    const {currentUser} = useAuth()
    const [application, setapplication] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            console.log(jobData?.id)
            const applicationRef =  doc(db, "jobcollection", jobId , "applications", currentUser.uid)
            const applicationSnap = getDoc(applicationRef)
            setapplication((await applicationSnap).data())
        }
        fetchData()
    }, [])
    
    return (
        <tr>
            <td>{jobData?.companyName}</td>
            <td>{jobData?.name}</td>
            <td>{jobData?.location}</td>
            <td>{application?.status}</td>
        </tr>
    )
};
