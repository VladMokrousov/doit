import React, { useState } from 'react';

import { ITodosPageState } from '../../../../interfaces';

import './search-panel.css';

interface SearchPanelProps {
  setState: React.Dispatch<React.SetStateAction<ITodosPageState>>;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ setState }) => {
  const [term, setTerm] = useState('');

  const onSearchReplace = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const changedTerm = evt.target.value;
    setTerm(changedTerm);

    setState((prevState) => ({ ...prevState, term: changedTerm }));
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
