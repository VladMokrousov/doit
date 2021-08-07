import React from 'react';
import './status-filter.css';
import { IEveryStatusCount } from '../../../../interfaces';

interface IButtonsParams {
  name: string;
  label: string;
  count?: number;
}

interface StatusFilterProps {
  filter: string;
  onFilterChange: (name: string) => void;
  everyStatusCount: IEveryStatusCount;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  filter,
  onFilterChange,
  everyStatusCount,
}) => {
  const buttonsParams: IButtonsParams[] = [
    { name: 'inProgress', label: 'In progress' },
    { name: 'new', label: 'New' },
    { name: 'done', label: 'Done' },
    { name: 'all', label: 'All' },
  ];

  buttonsParams.forEach((item) => {
    item.count = everyStatusCount[item.name];
  });

  const buttons: JSX.Element[] = buttonsParams.map(({ name, label, count }): JSX.Element => {
    const isActive = filter === name;
    const clazz = isActive ? 'status-filter__btn--active' : null;
    return (
      <button
        type="button"
        className={`status-filter__btn btn ${clazz}`}
        key={name}
        onClick={() => {
          onFilterChange(name);
        }}
      >
        {`${label} - ${count}`}
      </button>
    );
  });
  return <div className="status-filter">{buttons}</div>;
};

export default StatusFilter;
