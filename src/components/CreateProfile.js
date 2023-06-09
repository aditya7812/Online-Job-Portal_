import React, { useState } from 'react';
import './TempPage.css'
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, uploadBytes, ref, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

export default function CreateProfile() {
    const [profileImg, setProfileImg] = useState(null);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  
  const [pincode, setPincode] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [resume, setResume] = useState(null);
  const {currentUser} = useAuth()
  const navigate = useNavigate()
  

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImg(e.target.files[0]);
    }
  };

  const handleResumeChange = (e) => {
    if (e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // upload image to firebase storage
    
    const imageRef = ref(storage, `images/${currentUser.uid + v4()}`)
    
      
    
    const imageSnap = !profileImg ? null :await uploadBytes(imageRef, profileImg)
    const imageUrl = !imageSnap ? null : await getDownloadURL(imageSnap?.ref)

    const resumeRef = ref(storage, `resumes/${currentUser.uid + v4()}`)
    
    const resumeSnap = !resume ? null : await uploadBytes(resumeRef, resume)
    const resumeUrl = !resumeSnap ? null : await getDownloadURL(resumeSnap?.ref)
    // upload resume to firebase storage

    // create employee profile document in firebase firestore
    try { await setDoc(doc(db, 'employeeProfile', currentUser.uid), {
      imageUrl,
      fullName,
      mobileNumber,
      email,
      gender,
      nationality,
      pincode,
      birthdate,
      resumeUrl,
      'userId': currentUser.uid 
    }
   
    )
    toast.success("Success")
    navigate(-1)
    } catch {
      toast.error("An Error Occured")
      
    }
  }

    return (
        <div className='main-container2'>
        <div className="container3">
      <header>Registration Form</header>
      <form className="form2" onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor='name'>Full Name</label>
          <input id='name' type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter full name" required />
        </div>

        
        <div className="column">
        <div className="input-box">
          <label htmlFor='email'>Email Address</label>
          <input id='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" required />
        </div>
        <div className="input-box">
            <label htmlFor='phone'>Phone Number</label>
            <input id='phone' type="number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter phone number" required />
          </div>
        </div>

        <div className="column">
        <div className="input-box">
            <label htmlFor='gender'>Gender</label>
            <input id='gender' type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder="Gender" required />
        </div>
          <div className="input-box">
            <label htmlFor='birthdate'>Birth Date</label>
            <input id='birthdate' type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} placeholder="Enter birth date" required />
          </div>
        </div>
        
          <div className="column">
            <div className="input-box">
                <label htmlFor='nationality'>Nationality</label>
                <input id='nationality' type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} placeholder="Enter nationality" required />
            </div>
            <div className="input-box">
                <label htmlFor='postalcode'>Postal Code</label>
                <input id='postalcode' type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Enter Pincode" required />
            </div>
          </div>
        <div className="column">
          <div className="input-box">
            <label htmlFor='profileimage'>Profile Image</label>
            <input id='profileimage' className="filebox" type="file" onChange={handleImageChange} />
          </div>
          <div className="input-box">
            <label htmlFor='cv'>Upload Your CV</label>
            <input id='cv' className="filebox" type="file" onChange={handleResumeChange} />
          </div>
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
    </div>
    )
    
};
