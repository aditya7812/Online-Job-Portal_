import SearchType from "./SearchType";
import "./MainContainer.css"
import SearchedJobs from "./SearchedJobs";
import MainContainerTemp from "./MainContainerTemp";
export default function MainContainer({isEmployer}) {
    return (
        <div className="main-container">
            <SearchedJobs isEmployer={isEmployer}/>
            

        </div>
    )
    
};
