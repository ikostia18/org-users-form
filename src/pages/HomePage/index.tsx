import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import { SESSION_STORAGE_KEY } from '../../utils/consts.ts';
import Button from '../../components/Button/index.tsx';

const swing = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(-20deg);
  }
  40% {
    transform: rotate(20deg);
  }
  60% {
    transform: rotate(-10deg);
  }
  80% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const HomePageContainer = styled.div`
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeMessage = styled.h1`
  font-size: 2rem;
  color: #9b9bc0cc;
  width: 350px;
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
    animation: ${swing} 1s ease-in-out;
  }
`;

const SubscriptionData = styled.div`
  padding: 10px;
  margin: 10px 0 40px 0;
`;

const Label = styled.div`
  font-weight: bold;
`;

const ClearSessionButton = styled(Button)`
  margin-bottom: 20px;
  background-color: #f44336;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const [subscriptionData, setSubscriptionData] = useState<{ orgLabel: string, userIds: string[]; } | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSubscriptionData(parsedData);
    }
  }, []);

  const handleClearSession = () => {
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    setSubscriptionData(null);
  };

  return (
    <HomePageContainer>
      {subscriptionData ? (
        <>
          <HomeMessage>Subscribed!</HomeMessage>
          <SubscriptionData>
            <Label>Organization:</Label> {subscriptionData.orgLabel}<br />
            <Label>Selected Users:</Label> {subscriptionData.userIds.join(', ')}
          </SubscriptionData>
          <ClearSessionButton onClick={handleClearSession}>Clear Session Storage</ClearSessionButton>

        </>
      ) : (
        <HomeMessage>Welcome to Our App</HomeMessage>
      )}
      <Button onClick={() => navigate('/subscribe')}>Go to Subscribe</Button>
    </HomePageContainer>
  );
};

export default HomePage;
