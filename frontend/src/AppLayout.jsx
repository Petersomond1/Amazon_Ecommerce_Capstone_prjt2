import React from 'react';
import Navbardown from './Navbardown/Navbardown';
import { Outlet } from 'react-router-dom';


const AppLayout = () => {
  return (
    <>
      <Navbardown />
      <Outlet />
    </>
  );
};

export default AppLayout;