import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-600 text-white py-4 text-center mt-6">
      <p className="mt-1">&copy; {new Date().getFullYear()} Scrappy. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
