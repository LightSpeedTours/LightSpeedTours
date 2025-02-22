import React, { useState } from "react"; 
import styles from "./ToursSearch.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../../shared/components/Button"; 

export default function Search() { 
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    if (searchTerm.trim() === "") {
      alert("Por favor ingresa un término de búsqueda");
      return;
    }
    console.log("Buscando:", searchTerm);
    // petición a una API
  };
  

  return (
    <div className={styles.searchContainer}>
      <div className={styles.planeta}>
        <h1>Planeta</h1> 
      </div>

      {/* Botón de fecha de entrada */}
      <div className={styles.entryDateSelector}>
        <Button 
          onClick={() => setShowStartCalendar(!showStartCalendar)} 
          text={startDate ? `Entrada: ${startDate.toLocaleDateString()}` : "Fecha de entrada"} 
          type="button"
        />
        {showStartCalendar && (
          <div className={styles.calendarWrapper}>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date ?? undefined);
                setShowStartCalendar(false);
              }}
              selectsStart
              startDate={startDate}
              inline
            />
          </div>
        )}
      </div>
      <div>
      <input
        type="text"
        placeholder="Nombre del tour"
        value={searchTerm}
        onChange={handleSearch}
        className={styles.typeBar}
      />
      <div className= {styles.searchButton}>
      <Button text="Buscar" type="submit"/>
      </div>
    </div>
    </div>
  );
}
