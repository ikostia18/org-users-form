import styled from 'styled-components';

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const ErrorPage = () => {
    return (
        <CenteredContainer>
            <div>
                <h1>404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </CenteredContainer>
    );
};

export default ErrorPage;
