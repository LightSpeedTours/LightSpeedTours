import React, { useState, useEffect } from 'react';
import styles from './ToursSearch.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../../shared/components/Button';


//Estado inicial de las busquedas (similar al de los filtros)
interface SearchProps {
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  selectedPlanets: string[];
  setSelectedPlanets: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Search({
  selectedServices,
  setSelectedServices,
  rating,
  setRating,
  startDate,
  setStartDate,
  selectedPlanets,
  setSelectedPlanets
}: SearchProps) {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  //Ocultar calendarios al hacer clic por fuerta
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(`.${styles.calendarWrapper}`) && !target.closest(`.${styles.entryDateSelector}`)) {
        setShowStartCalendar(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  //Funcion para reiniciar filtros
  const resetFilters = () => {
    setSearchTerm('');
    setStartDate(undefined);
    setSelectedServices([]);
    setRating(0);
    setSelectedPlanets([]);
    setShowStartCalendar(false);
  };

  return (
    <div className={styles.searchContainer}>
      {/* Calendario de entrada*/}
      <div className={styles.entryDateSelector} onClick={(e) => e.stopPropagation()}>
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
