import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NavigationBar() {

  // t - tõlkimiseks
  // i18n - keele vahetamiseks
  const { t, i18n } = useTranslation();
  //  const { t } = useTranslation();

  return (
  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand as={Link} to="/"> <img className='logo' alt='main logo' src='/webshio.png' /> </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/admin">Admin vaatesse</Nav.Link>
      <Nav.Link as={Link} to="/ostukorv">{t('cart-button')}</Nav.Link>
    </Nav>
    <button onClick={() => i18n.changeLanguage('en')}>ENGLISH</button>
    <button onClick={() => i18n.changeLanguage('fr')}>FRENCH</button>
    </Container>
  </Navbar>);
}

export default NavigationBar;