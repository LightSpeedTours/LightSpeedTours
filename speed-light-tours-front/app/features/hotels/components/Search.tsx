import React, { useState, useEffect } from 'react';
import styles from './Search.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../../../shared/components/Button';

interface SearchProps {
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
  selectedServices: string[];
  setSelectedServices: React.Dispatch<React.SetStateAction<string[]>>;
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  startDate: Date | undefined;
  setStartDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  endDate: Date | undefined;
  setEndDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  selectedPeople: number | null;
  setSelectedPeople: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function Search({
  selectedLocations,
  setSelectedLocations,
  selectedServices,
  setSelectedServices,
  rating,
  setRating,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  selectedPeople,
  setSelectedPeople
}: SearchProps) {
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [planet, setPlanet] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const planetName = params.get('planet');
      setPlanet(planetName);
    }
  }, []);

  // Cerrar calendarios y dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(`.${styles.calendarWrapper}`) &&
        !target.closest(`.${styles.peopleDropdown}`) &&
        !target.closest(`.${styles.entryDateSelector}`) &&
        !target.closest(`.${styles.leaveDateSelector}`) &&
        !target.closest(`.${styles.people}`)
      ) {
        setShowStartCalendar(false);
        setShowEndCalendar(false);
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSelect = (people: number) => {
    setSelectedPeople(people);
    setIsOpen(false);
  };

  const capitalizeFirstLetter = (text: string | null) => {
    if (!text) return null;
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const resetFilters = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setSelectedPeople(null);
    setSelectedLocations([]);
    setSelectedServices([]);
    setRating(0);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.planeta}>
        <h1>{capitalizeFirstLetter(planet) || 'Planeta'}</h1>
      </div>

      <div className={styles.entryDateSelector} onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={() => {
            setShowStartCalendar(!showStartCalendar);
            setShowEndCalendar(false);
            setIsOpen(false)
          }}
          text={startDate ? `${startDate.toLocaleDateString()}` : 'Entrada'}
          type="button"
        />
        {showStartCalendar && (
          <div className={styles.calendarWrapper}>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date ?? undefined);
                setShowStartCalendar(false);
                setIsOpen(false)
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              inline
            />
          </div>
        )}
      </div>

      <div className={styles.leaveDateSelector} onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={() => {
            setShowEndCalendar(!showEndCalendar);
            setShowStartCalendar(false);
            setIsOpen(false)
          }}
          text={endDate ? `${endDate.toLocaleDateString()}` : 'Salida'}
          type="button"
        />
        {showEndCalendar && (
          <div className={styles.calendarWrapper}>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date ?? undefined);
                setShowEndCalendar(false);
                setIsOpen(false)
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              inline
            />
          </div>
        )}
      </div>

      <div className={styles.people} onClick={(e) => e.stopPropagation()}>
        <Button
          onClick={() => {setIsOpen(!isOpen); setShowEndCalendar(false); setShowEndCalendar(false) }}
          text={selectedPeople ? `Huespedes: ${selectedPeople}` : 'Huespedes'}
          type="button"
        />
        {isOpen && (
          <div className={styles.peopleDropdown}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((people) => (
              <button key={people} className={styles.peopleOption} onClick={() => handleSelect(people)}>
                {people}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.searchButton}>
        <Button text="Limpiar filtros" type="button" onClick={resetFilters} />
      </div>
    </div>
  );
}
