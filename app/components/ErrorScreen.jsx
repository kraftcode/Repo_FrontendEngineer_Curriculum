import React from "react";

const ErrorScreen = () => (
  <div className="container">
    <div className="container_error">
      <div className="row">
        <img className="image_error" src="../assets/errorImage.png" alt="Source missing... " />
        <div className="text">
          <p>
            Sorry somehing went horribly wrong.
          </p>
          <p>
            We are sorry for the inconvenience.
          </p>
          <p>
            Moderately talented people are working on it.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorScreen;
