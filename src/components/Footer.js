import React from 'react';

const Footer = () => {
  const developers = [
    { name: "Emmanuel González", github: "https://github.com/PLAYMAN11" },
    { name: "Jesús Jiménez", github: "https://github.com/pepepecas12000" },
    { name: "Ailton Márquez", github: "https://github.com/Mirokiats" },
    { name: "Andrik Esquer", github: "https://github.com/andrikesquer" },
  ];

  return (
    <footer className="bg-indigo-600 text-white py-4 text-center">
      <div>
        <h2 className="text-lg font-semibold mb-1">Desarrollado por:</h2>
        <div className="flex justify-center space-x-4">
          {developers.map((dev, index) => (
            <a
              key={index}
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              {dev.name}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-1">&copy; {new Date().getFullYear()} Scrappy. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
