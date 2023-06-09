import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const TempLogin = ({isEmployer}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSignUp =  async (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then( async (userCredential) =>  {
        console.log(userCredential)
        const docRef = await setDoc(doc(db, "jobcollection", userCredential.user.uid), {
            email
          });
        console.log(docRef)
    });
      console.log(isEmployer);
        if (isEmployer) {
          navigate("/employer-home-page");
        } else {
          navigate("/employee-home-page");
        }
     
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <br />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default TempLogin;
