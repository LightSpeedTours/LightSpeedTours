"use client"

import Button from "./Button"
import { Bell } from "lucide-react"
import planetsImages from "../utils/planetsImagesLists"
import InputField from "./InputField"
import { useState } from "react"

export default function Header() {
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <header className="w-full bg-[#000000]">
      {/* Top Navigation */}
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
          <Button text="Mis reservas" className="bg-[#2E67F8] hover:bg-[#1E4FCC] text-white" />
          <Button text="Usuario" className="bg-[#2E67F8] hover:bg-[#1E4FCC] text-white" />
        </div>
      </div>
{/* Circular Indicators */}
<div className="w-full bg-[#1A1A1A] py-4 flex justify-center border-y border-[#2C2C2C]">
        <div className="flex gap-2 overflow-x-auto px-4">
          {Object.entries(planetsImages).map(([planeta, imagen]) => (
            <button
              key={planeta}
              className="w-8 h-8 rounded-full bg-[#2C2C2C] flex-shrink-0 overflow-hidden border-2 border-[#FFE81F] transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FFE81F] focus:ring-offset-2 focus:ring-offset-[#1A1A1A]"
              onClick={() => {
                // TODO: Implement redirection to planet page
                // router.push(`/planets/${planeta}`);
                console.log(`Clicked on ${planeta}`)
              }}
              aria-label={`View ${planeta}`}
            >
              <img src={imagen || "/placeholder.svg"} alt={planeta} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="w-full bg-[#1A1A1A] px-4 py-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Button text="Inicio" className="bg-[#2E67F8] hover:bg-[#1E4FCC] text-white" />
          <Button text="Hospedajes" className="bg-[#2E67F8] hover:bg-[#1E4FCC] text-white" />
          <Button text="Tours" className="bg-[#2E67F8] hover:bg-[#1E4FCC] text-white" />
        </div>
        <div className="flex items-center gap-4">
          <Button text="Buscar" className="bg-[#2E67F8] hover:bg-[#1E4FCC] text-white" />
          <div className="relative w-64">
            <InputField
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Nombre del planeta"
              
            />
            {searchValue && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FFE81F] hover:text-[#FFD700]"
                onClick={() => setSearchValue("")}
              >
                ×
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

