import { useNavigate } from "react-router-dom"
import "./Header.css"
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import logo from "./blank-profile.webp"
import { toast } from 'react-toastify';

export default function Header({isEmployer}) {
  const [currentUserData, setCurrentUserData] = useState("")
  const {currentUser, logout} = useAuth()
  const  navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = !isEmployer ? doc(db, "employeeProfile", currentUser.uid) : null
      const docSnap = !isEmployer ? await getDoc(docRef) : null
      console.log(docSnap?.data())
      setCurrentUserData(docSnap?.data())
      console.log(docSnap?.data().imageUrl)

    }
    fetchData()
  }, [])

  const handleLogOut = async () => {
    try {
    await logout()
    toast.success("Logged Out Successfully")
    navigate("/")
    } catch {
      toast.error("An Error Occured")
    }
  }
  const handlePostJob = () => {
    navigate("/post-jobs")
  }

    return (
        <div className="header">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M512 503.5H381.7a48 48 0 01-45.3-32.1L265 268.1l-9-25.5 2.7-124.6L338.2 8.5l23.5 67.1L512 503.5z"
              fill="#0473ff"
              data-original="#28b446"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              fill="#0473ff"
              data-original="#219b38"
              d="M361.7 75.6L265 268.1l-9-25.5 2.7-124.6L338.2 8.5z"
            />
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="M338.2 8.5l-82.2 234-80.4 228.9a48 48 0 01-45.3 32.1H0l173.8-495h164.4z"
              fill="#0473ff"
              data-original="#518ef8"
            />
          </svg>
          JobScan
        </div>
        <div className="header-menu">
          <Link to={`${isEmployer ? '/employer-home-page' : '/employee-home-page'}`}>Find Job</Link>
          <Link to={`${isEmployer ? '/employer-home-page/my-jobs' : '/employee-home-page/my-jobs'}`}>My Jobs</Link>
        </div>
        <div className="user-settings">
          
          
          {isEmployer ? 
          <button className="search-buttons card-buttons register" onClick={handlePostJob}>Post Job</button> 
            : 
            currentUserData ? <div className="profileImgTag"><Link to={`/employee-home-page/users/${currentUser.uid}`}><img src={currentUserData.imageUrl ? currentUserData.imageUrl : logo} alt="" className="actualImg" /></Link></div> :
              <button className="search-buttons card-buttons register" ><Link className="whiteTextTag" to={`/employee-home-page/users/${currentUser.uid}/update`}>Create Profile</Link></button>
            }
            <button className="search-buttons card-buttons register" onClick={handleLogOut}>Log Out</button> 
            
        </div>
      </div> 
    )
}