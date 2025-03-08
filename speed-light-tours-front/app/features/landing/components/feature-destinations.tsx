'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';


interface Destination {
  id: number;
  name: string;
  location: string;
  dates: string;
  price: string;
  description: string;
  capacity: string;
  imageUrl: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Tatooine Dunes',
    location: 'Tatooine, Mos Eisley',
    dates: '27/07/2025',
    price: '$80',
    description: 'Explora las dunas de Tatooine partiendo desde Mos Eisley con alimentación incluida, recogida en el hotel y snack al atardecer.',
    capacity: '4 personas',
    imageUrl: 'app/shared/assets/tours/tatooine-dunes.png',
    
  },
  {
    id: 2,
    name: 'Echo Ice Tour',
    location: 'Hoth, Echo Base',
    dates: '10/06/2025',
    price: '$70',
    description: 'Recorre la base helada en Echo Base con transporte, comida caliente y snack de bienvenida.',
    capacity: '6 personas',
    imageUrl: 'app/shared/assets/tours/echo-ice-tour.png',
  },
 
  {
    id: 3,
    name: 'Ewok Tour',
    location: 'Endor, Bright Tree Village',
    dates: '27/04/2025',
    price: '$65',
    description: 'Explora Bright Tree Village con alimentación incluida, recogida en el hotel y un snack típico Ewok.',
    capacity: '8 personas',
    imageUrl: 'app/shared/assets/tours/ewok-tour.png'
  },
 
  {
    id: 4,
    name: 'Theed Palace',
    location: 'Naboo, Theed',
    dates: '22/05/2025',
    price: '$100',
    description: 'Descubre la arquitectura de Theed, con alimentación, transporte de ida y vuelta y visita guiada al palacio.',
    capacity: '2 personas',
    imageUrl: 'app/shared/assets/tours/theed-palace.png'
  },

  {
    id: 5,
    name: 'Upper City Tour',
    location: 'Coruscant, Upper City',
    dates: '15/03/2025',
    price: '$120',
    description: 'Descubre las vistas de Upper City con alimentación incluida, recogida y regreso al hotel, y snack.',
    capacity: '5 personas',
    imageUrl: 'app/shared/assets/tours/upper-city-tour.png'
  },
];

export default function FeaturedDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= destinations.length ? 0 : prev + 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, destinations.length - 3) : prev - 3));
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destinations.slice(currentIndex, currentIndex + 3).map((destination) => (
          <div
            key={destination.id}
            className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2E67F8] hover:border-[#FFE81F] transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2 text-[#FFE81F]">{destination.name}</h3>
            <div className="aspect-video bg-[#2C2C2C] mb-4 rounded-md border border-[#2E67F8]">
            <img
                src={destination.imageUrl}
                alt={destination.name}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#FFE81F]">{destination.price} por persona</h3>
                <div className="text-sm text-[#CCCCCC]">
                <h3>{destination.name}</h3>
                </div>
              </div>
              <p className="text-white">{destination.description}</p>
              <p className="text-sm text-[#CCCCCC]">{destination.capacity}</p>
              <p>{destination.location}</p>
              <h3>{destination.dates}</h3>
            </div>
          </div>
        ))}
      </div>

      {destinations.length > 3 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#1A1A1A] text-[#FFE81F] rounded-full p-2 shadow-md border border-[#FFE81F] hover:bg-[#2C2C2C]"
            aria-label="Previous destinations"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#1A1A1A] text-[#FFE81F] rounded-full p-2 shadow-md border border-[#FFE81F] hover:bg-[#2C2C2C]"
            aria-label="Next destinations"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}
