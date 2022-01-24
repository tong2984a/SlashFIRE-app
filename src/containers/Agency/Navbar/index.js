import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { openModal, closeModal } from '@redq/reuse-modal';
import NavbarWrapper from 'common/components/Navbar';
import Drawer from 'common/components/Drawer';
import Button from 'common/components/Button';
import Logo from 'common/components/UIElements/Logo';
import HamburgMenu from 'common/components/HamburgMenu';
import ScrollSpyMenu from 'common/components/ScrollSpyMenu';
import { Container } from './navbar.style';
import SearchPanel from '../SearchPanel';
import LoginModal from '../LoginModal';
import CopyrightSection from '../CopyrightsSection';

import LogoImage from 'common/assets/image/agencyDigital/logo-v2.png';
import BtnImage from 'common/assets/image/agencyDigital/btn-img.png';

import { DrawerContext } from 'common/contexts/DrawerContext';

import data from 'common/data/Agency/';

// Default close button for modal
const CloseModalButton = () => (
  <Button
    className="modalCloseBtn"
    variant="fab"
    onClick={() => closeModal()}
    icon={<i className="flaticon-plus-symbol" />}
  />
);

// Alt close button for modal
const CloseModalButtonAlt = () => (
  <Button
    className="modalCloseBtn alt"
    variant="fab"
    onClick={() => closeModal()}
    icon={<i className="flaticon-plus-symbol" />}
  />
);

const Navbar = ({ navbarStyle, logoStyle, btnStyle, handleWalletRequestPermissions, handleRegister }) => {
  const { state, dispatch } = useContext(DrawerContext);

  // Search modal handler
  const handleSearchModal = () => {
    openModal({
      config: {
        className: 'search-modal',
        disableDragging: true,
        width: '100%',
        height: '100%',
        animationFrom: { transform: 'translateY(100px)' }, // react-spring <Spring from={}> props value
        animationTo: { transform: 'translateY(0)' }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 180,
          friction: 26,
        },
      },
      component: SearchPanel,
      componentProps: {},
      closeComponent: CloseModalButtonAlt,
      closeOnClickOutside: false,
    });
  };

  // Authentication modal handler
  const handleLoginModal = () => {
    openModal({
      config: {
        className: 'login-modal',
        disableDragging: true,
        width: '100%',
        height: '100%',
        animationFrom: { transform: 'translateY(100px)' }, // react-spring <Spring from={}> props value
        animationTo: { transform: 'translateY(0)' }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 180,
          friction: 26,
        },
      },
      component: LoginModal,
      componentProps: {},
      closeComponent: CloseModalButton,
      closeOnClickOutside: false,
    });
  };

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container fullWidth={true}>
        <Logo
          href="#"
          title=''
          logoSrc={LogoImage}
          logoStyle={logoStyle}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            className={"dark-red-variant"}
            iconPosition={"left"}
            variant="textButton"
            title={"SlashFIRE"}
            onClick={handleRegister}
            {...btnStyle}
          />
        </div>
      </Container>
    </NavbarWrapper>
  );
};

// Navbar style props
Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
};

Navbar.defaultProps = {
  // Default navbar style
  navbarStyle: {
    minHeight: '70px',
    backgroundColor: 'rgba(17, 17, 24, 0.57)',
  },
  btnStyle: {
    borderRadius: '18px',
    border: '1px solid #EA4543',
    padding: '10px 20px',
    color: '#EA4543',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: 'Poppins'
  },
  // Default logo size
  logoStyle: {
    width: '160px',
    height: 'auto',
  },
};

export default Navbar;
