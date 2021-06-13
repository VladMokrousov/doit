import React from 'react';
import './page-title.css';

interface PageTitleProps {
  text: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return <h1 className="page-title">{text}</h1>;
};

export default PageTitle;
