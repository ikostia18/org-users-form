import styled from 'styled-components';

const StyledButton = styled.button`
  width: 200px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #9b9bc0cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #9393d68e;
  }
  
  &:disabled {
    background-color: #e0e0e0;
    color: #bdbdbd;
    cursor: not-allowed;
  }
`;

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    ...props
}) => {
    return <StyledButton onClick={onClick} {...props}>{children}</StyledButton>;
};

export default Button;
