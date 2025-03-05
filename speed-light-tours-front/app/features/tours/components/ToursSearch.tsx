import React, { useState } from 'react';
import styles from './ToursSearch.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../../shared/components/Button';

interface SearchProps {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function Search({
  selectedServices,
  setSelectedServices,
  rating,
  setRating,
  startDate,
  setStartDate}: SearchProps) {
  
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = () => {
    if (searchTerm.trim() === '') {
      alert('Por favor ingresa un término de búsqueda');
      return;
    }
    console.log('Buscando:', searchTerm);
    // petición a una API
  };

  const resetFilters = () => {
    setStartDate(undefined);
    setSelectedServices([]);
    setRating(0);
  };


  return (
    <div className={styles.searchContainer}>
      {/* Botón de fecha de entrada */}
      <div className={styles.entryDateSelector}>
        <Button
          onClick={() => setShowStartCalendar(!showStartCalendar)}
          text={startDate ? `${startDate.toLocaleDateString()}` : 'Fecha'}
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


      {/* Limpiar filtros */}
      <div className={styles.searchButton}>
        <Button text="Limpiar filtros" type="button" onClick={resetFilters} />
      </div>
    </div>
  );
}
