// @todo Не учитывает, что у компонента может быть prop title для доступности

declare module '!@svgr/webpack*' {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  export default ReactComponent;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
