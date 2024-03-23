import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoImage from '../../assets/logo.webp';

const Nav = styled.nav`
  background: #333;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LogoAndNameContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 50px;
  height: auto;
`;

const CompanyName = styled.h1`
  color: #fff;
  margin-left: 1rem;
  font-size: 1.5rem;
`;

const NavLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }

  &:not(:last-child)::after {
    content: '|';
    color: #fff;
    margin: 0 10px;
  }
`;

const PageTitle = styled.h2`
  color: #fff;
  font-size: 1.25rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const NavBar = () => {
  const location = useLocation();

  const title = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/subscribe':
        return 'Subscribe';
      default:
        return '';
    }
  };

  return (
    <Nav>
      <LogoAndNameContainer>
        <Logo src={LogoImage} alt="Company Logo" />
        <CompanyName>S Corporation</CompanyName>
      </LogoAndNameContainer>

      {title && <PageTitle>{title}</PageTitle>}

      <NavLinkContainer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/subscribe">Subscribe</NavLink>
      </NavLinkContainer>
    </Nav>
  );
};

export default NavBar;
