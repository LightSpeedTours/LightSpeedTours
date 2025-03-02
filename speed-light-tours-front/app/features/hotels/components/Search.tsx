import React, { useState } from 'react';
import styles from './Search.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../../shared/components/Button';

export default function Search() {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelect = (rooms: number) => {
    setSelectedRooms(rooms);
    setIsOpen(false); // Oculta la lista después de seleccionar
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    if (searchTerm.trim() === '') {
      alert('Por favor ingresa un término de búsqueda');
      return;
    }
    console.log('Buscando:', searchTerm);
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
          text={startDate ? `Entrada: ${startDate.toLocaleDateString()}` : 'Fecha de entrada'}
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
              endDate={endDate}
              inline
            />
          </div>
        )}
      </div>

      {/* Botón de fecha de salida */}
      <div className={styles.leaveDateSelector}>
        <Button
          onClick={() => setShowEndCalendar(!showEndCalendar)}
          text={endDate ? `Salida: ${endDate.toLocaleDateString()}` : 'Fecha de salida'}
          type="button"
        />
        {showEndCalendar && (
          <div className={styles.calendarWrapper}>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date ?? undefined);
                setShowEndCalendar(false);
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate} // Evita seleccionar una fecha de salida anterior a la de entrada
              inline
            />
          </div>
        )}
      </div>

      {/* Botón cantidad de habitaciones */}
      <div className={styles.rooms}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          text={selectedRooms ? `Habitaciones: ${selectedRooms}` : 'Seleccionar habitaciones'}
          type="button"
        />
        {isOpen && (
          <div className={styles.roomsDropdown}>
            {[1, 2, 3, 4, 5].map((rooms) => (
              <button key={rooms} className={styles.roomOption} onClick={() => handleSelect(rooms)}>
                {rooms}
              </button>
            ))}
          </div>
        )}
      </div>
      <div>
        <input
          type="text"
          placeholder="Nombre del hospedaje"
          value={searchTerm}
          onChange={handleSearch}
          className={styles.typeBar}
        />
        <div className={styles.searchButton}>
          <Button text="Buscar" type="submit" />
        </div>
      </div>
    </div>
  );
}
