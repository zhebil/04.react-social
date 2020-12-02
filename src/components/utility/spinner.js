import React from "react";
import "./spinner.scss"
export default function Spinner() {
  return (
    <div className="spinner">
      <div className="loadingio-spinner-ripple">
        <div className="ldio">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
