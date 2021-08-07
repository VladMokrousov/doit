import React, { useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { useTooltipContext } from '../../context';
import './tooltip.css';

const Tooltip: React.FC = () => {
  const { message, type, isOpen, hideTooltip } = useTooltipContext();

  useEffect(() => {
    if (isOpen) {
      let timerId = setTimeout(hideTooltip, 10000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isOpen]);

  return (
    <Transition in={isOpen} timeout={300} unmountOnExit>
      {(transitionState: string) => (
        <div className={`tooltip ${transitionState} tooltip--${type}`}>
          <span className="tooltip__message">{message}</span>
          <button className="tooltip__close" onClick={() => hideTooltip()}></button>
        </div>
      )}
    </Transition>
  );
};
export default Tooltip;
