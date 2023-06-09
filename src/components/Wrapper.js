//import SearchMenu from './SearchMenu'
import "./Wrapper.css"
import MainContainer from './MainContainer'
export default function Wrapper({isEmployer}) {
    return (
        <div className="wrapper">
            {/*<SearchMenu/>*/}
            <MainContainer isEmployer={isEmployer}/>
        </div>
    )
    
};
