import React, { useState, useContext } from 'react';

interface TooltipContextProps {
  children: React.ReactNode;
}

//По идее мне не нужно указывать тип и аргумент. Нужно посмотреть, как сделать нормально
const TooltipContext = React.createContext<any>({});

export const useTooltipContext = () => {
  return useContext(TooltipContext);
};

//Не уверен, что корректно давать контексту тип React.FC
export const TooltipProvider: React.FC<TooltipContextProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showTooltip = (message: string): void => {
    setMessage(message);
    setIsOpen(true);
  };
  const hideTooltip = (): void => {
    setIsOpen(false);
  };

  return (
    <TooltipContext.Provider value={{ isOpen, message, showTooltip, hideTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};
