import React from 'react';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from 'app/shared/components/Button';
import '../styles/app.css';

export default function Header() {
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
          <Link to="/cart">
            <button className="text-[#FFE81F] p-2 rounded hover:bg-[#2C2C2C] transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </Link>
          <Link to="/reservations">
            <Button text="Mis reservas" />
          </Link>
          <Link to="/profile">
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
                <Link to="/">
                  <Button text="Inicio" />
                </Link>
                <Link to="/tours">
                  <Button text="Tours" />
                </Link>
                <Link to="/hotels">
                  <Button text="Hospedajes" />
                </Link>
              </div>
            )}
    </header>
  );
}
