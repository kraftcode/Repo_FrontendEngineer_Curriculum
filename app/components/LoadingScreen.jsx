import React from "react";

const LoadingScreen = () => {
  return (
    <div className="container__loading">
      <div className="textbox">
        <div className="loadingspinner" />
        <div className="text">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
