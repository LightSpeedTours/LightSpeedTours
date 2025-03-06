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

      <div className={styles.entryDateSelector}>
        <Button
          onClick={() => {
            setShowStartCalendar(!showStartCalendar);
            setShowEndCalendar(false);
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
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              inline
            />
          </div>
        )}
      </div>

      <div className={styles.leaveDateSelector}>
        <Button
          onClick={() => {
            setShowEndCalendar(!showEndCalendar);
            setShowStartCalendar(false);
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

      <div className={styles.people}>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          text={selectedPeople ? `Habitaciones: ${selectedPeople}` : 'Huespedes'}
          type="button"
        />
        {isOpen && (
          <div className={styles.peopleDropdown}>
            {[1, 2, 3, 4, 5].map((people) => (
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
