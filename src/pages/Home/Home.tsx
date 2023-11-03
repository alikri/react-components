import { MainContent } from '../../components/mainContent/MainContent';
import { RightSideProvider } from '../../context/context';

export const Home = () => {
  return (
    <RightSideProvider>
      <MainContent />
    </RightSideProvider>
  );
};
