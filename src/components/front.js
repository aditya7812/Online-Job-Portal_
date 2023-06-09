import logo from './heroNew.webp'
import './front.css'
import { useNavigate } from 'react-router-dom'
export default function Front() {
    const navigate = useNavigate()
    
    const handleEmployerSignUp = () => {
      navigate("employer-signup")
    }
  
    const handleEmployeeSignUp = () => {
      navigate("employee-signup")
    }
    return (
        <div className="mainfront">
            <div className="mainfront2">
                <div className="leftmain">
                <div className="logohome">
          
                   JobScan
                </div>
                    <div className="maintitle">India's #1 Job Portal</div>
                    <div className="button-container">
                        <div className="buttonwrapperleft">
                            <p className='pleftmain'>Want a Job</p>
                            <button className='buttonleft' onClick={handleEmployeeSignUp}>
                                <p className='pleftchild'>Search Here</p>
                                <svg width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="2" transform="translate(5 5)"><circle cx="6" cy="6" r="6"></circle><path strokeLinecap="round" d="M11.051 11.017L13.704 15.142" transform="rotate(-10 12.377 13.08)"></path></g></svg>
                            </button>
                        </div>
                        <div className="buttonwrapperright">
                            <p className='prightmain'>Want to Hire?</p>
                            <button className='buttonright' onClick={handleEmployerSignUp}>
                                <p className='prightchild'>Post a Job</p>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.9965 12.4381H18.584C18.2914 12.4381 18.0543 12.6753 18.0543 12.9678V19.408C18.0543 19.7499 17.7761 20.028 17.4342 20.028H5.09169C4.74993 20.028 4.47194 19.7499 4.47194 19.408V7.06568C4.47194 6.72378 4.74993 6.44558 5.09169 6.44558H11.8616C12.1542 6.44558 12.3913 6.20841 12.3913 5.91587V4.50333C12.3913 4.2108 12.1542 3.97363 11.8616 3.97363H5.09169C3.3869 3.97363 2 5.36075 2 7.06568V19.4081C2 21.113 3.38697 22.5 5.09169 22.5H17.4342C19.1391 22.5 20.5262 21.113 20.5262 19.4081V12.9679C20.5262 12.6753 20.2891 12.4381 19.9965 12.4381Z" fill="white"></path><path d="M21.4701 2.5H15.8515C15.5589 2.5 15.3218 2.73717 15.3218 3.0297V4.44224C15.3218 4.73478 15.5589 4.97194 15.8515 4.97194H17.7799L10.5233 12.2284C10.3164 12.4352 10.3164 12.7706 10.5233 12.9775L11.5221 13.9764C11.6215 14.0758 11.7562 14.1316 11.8967 14.1316C12.0372 14.1316 12.172 14.0758 12.2713 13.9764L19.5278 6.71982V8.64815C19.5278 8.94068 19.765 9.17785 20.0575 9.17785H21.4701C21.7626 9.17785 21.9998 8.94068 21.9998 8.64815V3.0297C21.9998 2.73717 21.7626 2.5 21.4701 2.5Z" fill="white"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="rightmain">
                    <span className='spanright'>
                        <img src={logo} alt="" srcSet="" width='680px' height='100%' />
                    </span>
                    
                </div>
            </div>
        </div>
    )
};
