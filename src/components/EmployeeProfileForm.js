import React, { useState } from 'react';
import './EmployeeProfileForm.css'
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { getDownloadURL, uploadBytes, ref } from 'firebase/storage';


export default function EmployeeProfileForm () {
  const [profileImg, setProfileImg] = useState(null);
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [resume, setResume] = useState(null);
  const {currentUser} = useAuth()
  

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
    
    const imageRef = ref(storage, `images/${currentUser.uid}`)
    const imageSnap = await uploadBytes(imageRef, profileImg)
    const imageUrl = await getDownloadURL(imageSnap.ref)

    const resumeRef = ref(storage, `resumes/${currentUser.uid}`)
    const resumeSnap = await uploadBytes(resumeRef, resume)
    const resumeUrl = await getDownloadURL(resumeSnap.ref)
    // upload resume to firebase storage

    // create employee profile document in firebase firestore
    await setDoc(doc(db, 'employeeProfile', currentUser.uid), {
      imageUrl,
      fullName,
      mobileNumber,
      email,
      gender,
      nationality,
      state,
      pincode,
      birthdate,
      resumeUrl,
      'userId': currentUser.uid 
    }
   
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Profile Image:
          <input type="file" onChange={handleImageChange} />
        </label>
        
        <label>
          Full Name:
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        
        <label>
          Mobile Number:
          <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </label>
        
        
        <div><label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        </div>
        
        <label>
          Gender:
          <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
        </label>
        
        <label>
          Nationality:
          <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)} />
        </label>
        
        <label>
          State:
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </label>
        
        <label>
          Pincode:
          <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        </label>
        
        <label>
          Birth Date:
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        </label>
        
        <label>
          Resume:
          <input type="file" onChange={handleResumeChange} />
        </label>
        <button type="submit">Create Profile</button>
        </form>
      </div>
  )
};