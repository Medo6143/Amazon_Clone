import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
