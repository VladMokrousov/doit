interface IBtnProps {
  name: string;
  label: string;
  count?: number;
}

const btnProps: IBtnProps[] = [
  { name: 'inProgress', label: 'In progress' },
  { name: 'new', label: 'New' },
  { name: 'done', label: 'Done' },
  { name: 'all', label: 'All' },
];

export default btnProps;
