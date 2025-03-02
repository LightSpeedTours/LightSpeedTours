'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Promotion {
  id: string;
  price: string;
  location: string;
  dates: string;
  description: string;
  capacity: string;
}

const promotions: Promotion[] = [
  {
    id: '1',
    price: '$100',
    location: 'Tatooine',
    dates: '2024-03-08 - 2024-03-15',
    description: 'Experience the thrill of a lifetime on Tatooine!',
    capacity: '100 seats available',
  },
  {
    id: '2',
    price: '$200',
    location: 'Hoth',
    dates: '2024-04-10 - 2024-04-17',
    description: 'Enjoy the icy landscapes of Hoth!',
    capacity: '50 seats available',
  },
  {
    id: '3',
    price: '$300',
    location: 'Endor',
    dates: '2024-05-12 - 2024-05-19',
    description: 'Explore the lush forests of Endor!',
    capacity: '75 seats available',
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
            <div className="aspect-video bg-[#2C2C2C] mb-4 rounded-md border border-[#2E67F8]"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-[#FFE81F]">{promotion.price}</h3>
                <div className="text-sm text-[#CCCCCC]">
                  <p>{promotion.location}</p>
                  <p>{promotion.dates}</p>
                </div>
              </div>
              <p className="text-white">{promotion.description}</p>
              <p className="text-sm text-[#CCCCCC]">{promotion.capacity}</p>
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
