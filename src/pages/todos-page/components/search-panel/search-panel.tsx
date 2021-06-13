import React, { useState } from 'react';
import './search-panel.css';

interface SearchPanelProps {
  onSearchChange: (changedTerm: string) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearchChange }) => {
  const [term, setTerm] = useState<string>('');

  const onSearchReplace = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const changedTerm = evt.target.value;
    setTerm(changedTerm);

    onSearchChange(changedTerm);
  };

  return (
    <input
      type="text"
      placeholder="Search by description"
      className="search-input"
      value={term}
      onChange={onSearchReplace}
    />
  );
};
export default SearchPanel;
