import React from "react";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "app/shared/components/Button";
import "../app.css";

export default function Header() {
  return (
    <header className="w-full bg-[#000000]">
      <div className="w-full px-4 py-2 flex justify-between items-center bg-[#1A1A1A]">
        <div className="flex items-center gap-4">
          <span className="text-[#FFE81F] font-medium">Nombre</span>
          <div className="w-12 h-12 bg-[#2C2C2C] rounded-md flex items-center justify-center border border-[#FFE81F]">
            Logo
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#FFE81F] p-2 rounded hover:bg-[#2C2C2C] transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          {/* Link for Mis Reservas */}
          <Link to="/reservations">
            <Button
              text="Mis reservas"
              className="bg-[#2E67F8] hover:bg-[#1E4FCC] text-white"
            />
          </Link>

          {/* Link for Usuario */}
          <Link to="/profile">
            <Button
              text="Usuario"
              className="bg-[#2E67F8] hover:bg-[#1E4FCC] text-white"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}