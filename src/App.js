import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import MyJobs from './components/MyJobs'
import JobPost from './components/JobPost'
import LoginPage from './components/LoginPage'
import EmployerHomePage from './components/EmployerHomePage';
import EmployeeHomePage from './components/EmployeeHomePage';
import JobOverview from './components/JobOverview'
import NewSignUp from './components/NewSignUp';
import { AuthProvider } from './contexts/AuthContext';
import JobPosting from './components/JobPosting';
import MyPostedJobs from './components/MyPostedJobs';
import ListApplicants from './components/ListApplicants';
import UserProfile from './components/UserProfile';
import CreateProfile from './components/CreateProfile';
import UpdateJobs from './components/UpdateJobs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Front from './components/front';


const App = () => {
  const [currentUserId, setcurrentUserId] = useState()
  
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Front />}></Route>
        <Route exact path='/new' element={<NewSignUp />}></Route>
        <Route exact path="/post-jobs" element={<JobPost />}></Route>
        <Route exact path='/my-jobs' element={<MyJobs />}></Route>
        <Route exact path="/employer-home-page" element={<EmployerHomePage />}></Route>
        <Route exact path="/employee-home-page" element={<EmployeeHomePage />}></Route>
        <Route exact path="/employee-home-page/profile" element={<UserProfile />}></Route>
        <Route exact path="/users/:userId/create" element={<CreateProfile />}></Route>
        <Route exact path="employee-home-page/users/:userId/update" element={<CreateProfile />}></Route>
        <Route exact path ="employer-signup" element={<LoginPage currentUserId={currentUserId} setCurrentUserId={setcurrentUserId} isEmployer={true} />}></Route>
        <Route exact path ="employee-signup" element={<LoginPage currentUserId={currentUserId} setCurrentUserId={setcurrentUserId} isEmployer={false} />}></Route>
        <Route exact path='jobs/:jobId' element={<JobOverview />}></Route>
        <Route exact path='employee-home-page/my-jobs' element={<JobPosting />}></Route>
        <Route exact path='employer-home-page/my-jobs' element={<MyPostedJobs />}></Route>
        <Route exact path='employer-home-page/my-jobs/:jobId' element={<ListApplicants />}></Route>
        <Route exact path='employer-home-page/my-jobs/jobs/:jobId' element={<UpdateJobs />}></Route>
        <Route exact path='employee-home-page/users/:userId' element={<UserProfile/>}></Route>
      </Routes>
      <ToastContainer/>
      </AuthProvider>
    </Router>
    
  );
};

export default App;
