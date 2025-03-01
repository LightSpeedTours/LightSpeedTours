import React from "react";
import { ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "app/shared/components/Button";
import "../styles/app.css";

export default function Header() {
  return (
    <header className="w-full bg-[#000000]">
      <div className="w-full px-4 py-2 flex justify-between items-center bg-[#1A1A1A]">
        <div className="flex items-center gap-4">
          <Link to="/landingPage" className="flex items-center gap-4">
            <span className="text-[#FFE81F] font-medium">Nombre</span>
            <div className="w-12 h-12 bg-[#2C2C2C] rounded-md flex items-center justify-center border border-[#FFE81F]">
              Logo
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/cart">
            <button className="text-[#FFE81F] p-2 rounded hover:bg-[#2C2C2C] transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </Link>
          <Link to="/reservations">
            <Button
              text="Mis reservas"
            />
          </Link>
          <Link to="/profile">
            <button className="text-[#FFE81F] p-2 rounded hover:bg-[#2C2C2C] transition-colors">
              <User className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
