import React from "react";

export default function Alert(props) {
  return (
      <div style={{height : '60px'}}>
      {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`}  role="alert">
     <strong className="mx-2">{props.alert.type}</strong> <span className="mx-2">{props.alert.message}</span>
     </div>}
     </div> 
  );
}
