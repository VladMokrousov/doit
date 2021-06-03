import React from "react";

interface PageTitleProps {
  text: string
}

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return <h1 className="page-title">{text}</h1>;
};

export default PageTitle;
