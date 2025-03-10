import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import Button from './Button';
import InputField from './InputField';
import planetsImages from '../utils/planetsImagesLists';
import "../styles/global.css";
import { Link } from 'react-router-dom';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    setIsAuthenticated(!!token); // Si hay token, está autenticado
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <header className="w-full bg-black text-[#FFE81F]">
      {/* Top Navigation */}
      <div className="w-full px-4 py-3 flex justify-between items-center bg-[#1A1A1A]">
        {/* Logo y Nombre */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-4">
            <span className="name">Light Speed Tours</span>
            <div className="w-12 h-12">
              <img
                src="/app/shared/assets/light-speed-tours.png"
                alt="Light Speed Tours Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </Link>
        </div>

        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && (
            <Link to="/cart">
              <button className="text-[#FFE81F] p-2 rounded hover:bg-[#2C2C2C] transition-colors">
                <ShoppingCart className="h-5 w-5" />
              </button>
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/reservations">
              <Button text="Mis reservas" />
            </Link>
          )}
          <Link to={isAuthenticated ? "/profile" : "/login"}>
            <button className="text-[#FFE81F] p-2 rounded hover:bg-[#2C2C2C] transition-colors">
              <User className="h-5 w-5" />
            </button>
          </Link>
        </div>

        {/* Botón de menú hamburguesa en pantallas pequeñas */}
        <button
          className="md:hidden text-[#FFE81F] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú desplegable en móviles */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A1A1A] flex flex-col items-center gap-4 p-4 border-y border-[#2C2C2C]">
          <Link to="/tours">
            <Button text="Tours" />
          </Link>
          <Link to="/hotels">
            <Button text="Hospedajes" />
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/reservations">
                <Button text="Mis reservas" />
              </Link>
              <Link to="/cart">
                <Button text="Carrito" />
              </Link>
            </>
          )}
          <Link to={isAuthenticated ? "/profile" : "/login"}>
            <Button text={isAuthenticated ? "Perfil" : "Login"} />
          </Link>
        </div>
      )}

         {/* Circular Navigators (planetas) */}
         <div className="w-full bg-[#1A1A1A] py-4 flex justify-center border-y border-[#2C2C2C] overflow-x-auto px-4">
        <div className="flex gap-2">
        {Object.entries(planetsImages).map(([planetName, imageUrl]) => (
        <a
          key={planetName}
          href={`/hotels?planet=${planetName.toLowerCase()}`}
          aria-label={`Ver hospedajes en ${planetName}`}
        >
          <button className="w-full h-10 rounded-full bg-[#2C2C2C] flex-shrink-0 overflow-hidden 
          border-2 border-[#FFE81F] transition-transform hover:scale-110">
            <img
              src={imageUrl}
              alt={planetName}
              className="w-full h-full object-cover"
            />
          </button>
        </a>
      ))}
        </div>
      </div>


      {/* Bottom Navigation */}
      <div className="w-full bg-[#1A1A1A] px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/">
            <Button text="Inicio" />
          </Link>
          <Link to="/hotels">
            <Button text="Hospedajes" />
          </Link>
          <Link to="/tours">
            <Button text="Tours" />
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <Button text="Buscar" />
          <div className="relative w-64">
            <InputField
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Nombre del planeta"
            />
            {searchValue && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FFE81F] hover:text-[#FFD700]"
                onClick={() => setSearchValue('')}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
