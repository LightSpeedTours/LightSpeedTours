'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Promotion {
  id: string;
  name: string;
  price: string;
  location: string;
  dates: string;
  description: string;
  capacity: string;
  imageUrl: string;
}

const promotions: Promotion[] = [
  {
    id: '1',
    name: 'Twin Suns Inn',
    price: '$10',
    location: 'Tatooine',
    dates: '03/05/2025 - 03/152025',
    description: 'Inn desértico sencillo en Mos Eisley, cuenta con desayuno tradicional, aire acondicionado, TV y una terraza para disfrutar de los dos soles.',
    capacity: '100 personas',
    imageUrl: 'app/shared/assets/hospedajes/twin-suns-inn.png',
  },
  {
    id: '2',
    name: 'Frostbite Retreat',
    price: '$45',
    location: 'Hoth',
    dates: '10/04/2025 - 17/04/2025',
    description: 'Retiro acogedor en Frostbite Outpost que incluye desayuno, Wi‑Fi, aire acondicionado, sala de juegos, ideal para familias.',
    capacity: '50 personas',
    imageUrl: 'app/shared/assets/hospedajes/frostbite-retreat.png',
  },
  {
    id: '3',
    name:'Moonlit Retreat',
    price: '$20',
    location: 'Endor',
    dates: '12/05/2025 - 19/05/2025',
    description: 'Retiro íntimo en Bright Tree Village que ofrece desayuno, aire acondicionado y acceso a senderos naturales para explorar.',
    capacity: '25 personas',
    imageUrl: 'app/shared/assets/hospedajes/moonlit-retreat.png',
  },
];

export default function PromotionsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-hidden">
        {promotions.map((promotion, index) => (
          <div
            key={promotion.id}
            className="flex-none w-full md:w-[calc(50%-8px)] bg-[#1A1A1A] rounded-lg p-4 transition-transform duration-300 ease-in-out border border-[#2E67F8] hover:border-[#FFE81F]"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <div
              className="aspect-video bg-[#2C2C2C] mb-4 rounded-md border border-[#2E67F8] overflow-hidden"
            >
              <img
                src={promotion.imageUrl}
                alt={promotion.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{promotion.price} por persona</h3>
                <div className="text-sm">
                  <h3>{promotion.name}</h3>
                </div>
              </div>
              <p className="text-white">{promotion.description}</p>
              <p className="text-sm">{promotion.capacity}</p>
              <p>{promotion.location}</p>
              <h3>{promotion.dates}</h3>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#1A1A1A] text-[#FFE81F] rounded-full p-2 shadow-md border border-[#FFE81F] hover:bg-[#2C2C2C]"
        aria-label="Previous promotion"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-[#1A1A1A] text-[#FFE81F] rounded-full p-2 shadow-md border border-[#FFE81F] hover:bg-[#2C2C2C]"
        aria-label="Next promotion"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
