import React from "react";

function TaskInfo({name,image,count,length}) {
 
  
   

  return (
    <>
      <div className="app_tracker-container">
        <div className="app_tracker-cont">
          <div className="app_tracker-content">
            <div className="app_tracker-image-cont">
              <img src={image} alt="Expired Tasks" className="app_tracker-image" />
            </div>
            <div className="app_tracker-title-cont">
              <h2 className="app_tracker-title">{name}</h2>
            </div>
            <div className="app_tracker-number-cont">
              {
                name == "Completed Tasks" ?  <h2 className="app_tracker-number">{count} / {length}</h2> : <h2 className="app_tracker-number">{count}</h2>
              }
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskInfo;
