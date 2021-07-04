import React from 'react';
import { Transition } from 'react-transition-group';
import { useTooltipContext } from '../../context';
import './tooltip.css';

const Tooltip: React.FC = () => {
  const { message, isOpen, hideTooltip } = useTooltipContext();

  return (
    <Transition in={isOpen} timeout={300} unmountOnExit>
      {(transitionState: string) => (
        <div className={`tooltip ${transitionState}`}>
          <span className="tooltip__message">{message}</span>
          <button className="tooltip__close" onClick={() => hideTooltip()}></button>
        </div>
      )}
    </Transition>
  );
};
export default Tooltip;
