import React from 'react';
import { useTooltipContext } from '../../context';
import './tooltip.css';

const Tooltip: React.FC = () => {
  const { message, isOpen, hideTooltip } = useTooltipContext();

  return isOpen ? (
    <div className="tooltip">
      <span className="tooltip__message">{message}</span>
      <button className="tooltip__close" onClick={() => hideTooltip()}></button>
    </div>
  ) : null;
};
export default Tooltip;
