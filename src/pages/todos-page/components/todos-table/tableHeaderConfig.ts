interface ITableHeaderConfig {
  text: string;
  class: string;
}

const classTemplate = 'table__header--';
const tableHeadersConfig: ITableHeaderConfig[] = [
  {
    text: 'Description',
    class: `${classTemplate}description`,
  },
  {
    text: 'Status',
    class: `${classTemplate}status`,
  },
  {
    text: 'Priority',
    class: `${classTemplate}priority`,
  },
  {
    text: 'End date plan',
    class: `${classTemplate}planDate`,
  },
  {
    text: 'End date actual',
    class: `${classTemplate}actualDate`,
  },
  {
    text: 'Action',
    class: `${classTemplate}action`,
  },
];

export default tableHeadersConfig;
