import "./SearchType.css"

export default function SearchType() {
    return (
        <div className="search-type">
            {/*<div className="alert">
              <div className="alert-title">Create Job Alert</div>
              <div className="alert-subtitle">
                Create a job alert now and never miss a job
              </div>
              <input type="text" placeholder="Enter job keyword" />
              <button className="search-buttons">Create Job Alerts</button>
    </div>*/}
            <div className="job-time">
              <div className="job-time-title">Type of Employment</div>
              <div className="job-wrapper">
                <div className="type-container">
                  
                  <label htmlFor="job1">Full Time Jobs</label>
                  <span className="job-number">56</span>
                </div>
                <div className="type-container">
                  
                  <label htmlFor="job2">Part Time Jobs</label>
                  <span className="job-number">43</span>
                </div>
                
                <div className="type-container">
                  
                  <label htmlFor="job4">Internship Jobs</label>
                  <span className="job-number">27</span>
                </div>
                <div className="type-container">
                  <input type="checkbox" id="job5" className="job-style" />
                  <label htmlFor="job5">Contract</label>
                  <span className="job-number">76</span>
                </div>
                
              </div>
            </div>
            <div className="job-time">
              <div className="job-time-title">Seniority Level</div>
              <div className="job-wrapper">
                <div className="type-container">
                  <input type="checkbox" id="job7" className="job-style" />
                  <label htmlFor="job7">Entry Level</label>
                  <span className="job-number">98</span>
                </div>
                <div className="type-container">
                  <input type="checkbox" id="job8" className="job-style" />
                  <label htmlFor="job8">Junior Level</label>
                  <span className="job-number">44</span>
                </div>
                <div className="type-container">
                  <input type="checkbox" id="job9" className="job-style" checked />
                  <label htmlFor="job9">Mid Level</label>
                  <span className="job-number">35</span>
                </div>
                <div className="type-container">
                  <input type="checkbox" id="job10" className="job-style" checked />
                  <label htmlFor="job10">Senior Level</label>
                  <span className="job-number">29</span>
                </div>
                <div className="type-container">
                  <input type="checkbox" id="job11" className="job-style" />
                  <label htmlFor="job11">Directors</label>
                  <span className="job-number">26</span>
                </div>
                
              </div>
            </div>
          </div>
           
    )
    
};
