import React from 'react';
import Logo from '../../assets/img/Logo.png';
import './Menu.css';
import Button from '../../components/Button';

function Menu() {
  return (
    <nav className="Menu">
      <a href="/">
        <img className="Logo" src={Logo} alt="Meowflix" />
      </a>

      <Button as="a" href="/">
          Novo vídeo33
      </Button>
    </nav>
  )
}

export default Menu;