import './HomePage.css'
import { useNavigate } from "react-router-dom";
export default function HomePage() {
    //const history = useHistory();
    const navigate = useNavigate();
    
    const handleEmployerSignUp = () => {
      navigate("employer-signup")
    }
  
    const handleEmployeeSignUp = () => {
      navigate("employee-signup")
    }
  
    return (
      <div className='container'>
        <h1 className='title'>Join The Worlds's Largest Job Portal</h1>
        <button onClick={handleEmployerSignUp}>Sign up as Employer</button>
        <button onClick={handleEmployeeSignUp}>Sign up as Employee</button>
      </div>
    );
  };
  