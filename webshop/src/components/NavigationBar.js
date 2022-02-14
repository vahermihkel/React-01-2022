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

  function changeLang(language) {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  }

  return (
  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand as={Link} to="/"> <img className='logo' alt='main logo' src='/webshio.png' /> </Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link as={Link} to="/admin">{t('admin-button')}</Nav.Link>
      <Nav.Link as={Link} to="/ostukorv">{t('cart-button')}</Nav.Link>
    </Nav>
    <img className="lang-flag" alt="" src="/language/united-kingdom.png" onClick={() => changeLang('en')} />
    <img className="lang-flag" alt="" src="/language/estonia.png" onClick={() => changeLang('ee')} />
    <img className="lang-flag" alt="" src="/language/russia.png" onClick={() => changeLang('ru')} />
    </Container>
  </Navbar>);
}

export default NavigationBar;