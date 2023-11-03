import { useState, createContext } from 'react';

interface RightSideContextType {
  rightSide: boolean;
  hideRightSide: () => void;
  showRightSide: () => void;
}

interface RightSideProviderProps {
  children: React.ReactNode;
}

const RightSideContext = createContext<RightSideContextType | undefined>(undefined);

export const RightSideProvider = ({ children }: RightSideProviderProps) => {
  const [rightSide, setRightSide] = useState<boolean>(false);

  const showRightSide = () => {
    setRightSide(true);
  };

  const hideRightSide = () => {
    setRightSide(false);
  };

  return (
    <RightSideContext.Provider value={{ rightSide, showRightSide, hideRightSide }}>
      {children}
    </RightSideContext.Provider>
  );
};
