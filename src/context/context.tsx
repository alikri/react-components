import { useState, createContext } from 'react';

interface RightSideContextType {
  rightSide: boolean;
  hideRightSide: (value: boolean) => void;
  showRightSide: (value: boolean) => void;
}

interface RightSideProviderProps {
  children: React.ReactNode;
}

export const RightSideContext = createContext<RightSideContextType>({
  rightSide: false,
  hideRightSide: () => {},
  showRightSide: () => {},
});

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
