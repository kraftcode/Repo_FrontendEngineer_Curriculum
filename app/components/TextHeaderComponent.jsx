import React from "react";

const TextHeaderComponent = (company) => {
  return (
    <div className="companyheader">
      {company.company}
    </div>
  );
};

export default TextHeaderComponent;
