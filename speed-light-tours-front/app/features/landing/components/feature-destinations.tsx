"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface Destination {
  id: number
  name: string
  location: string
  dates: string
  price: string
  description: string
  capacity: string
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Tatooine Desert Adventure",
    location: "Tatooine, Outer Rim",
    dates: "Dec 20 - Dec 27",
    price: "$2,500",
    description: "Experience the thrill of the Tatooine desert with this incredible adventure.",
    capacity: "4 people",
  },
  {
    id: 2,
    name: "Hoth Ice Planet Expedition",
    location: "Hoth, Outer Rim",
    dates: "Jan 10 - Jan 17",
    price: "$3,000",
    description: "Embark on an unforgettable expedition to the icy planet of Hoth.",
    capacity: "6 people",
  },
  {
    id: 3,
    name: "Dagobah Swamp Tour",
    location: "Dagobah, Outer Rim",
    dates: "Feb 15 - Feb 22",
    price: "$1,800",
    description: "Explore the mysterious swamps of Dagobah with this guided tour.",
    capacity: "2 people",
  },
  {
    id: 4,
    name: "Endor Forest Trek",
    location: "Endor, Outer Rim",
    dates: "Mar 20 - Mar 27",
    price: "$2,200",
    description: "Trek through the lush forests of Endor on this exciting adventure.",
    capacity: "8 people",
  },
  {
    id: 5,
    name: "Mustafar Volcano Hike",
    location: "Mustafar, Outer Rim",
    dates: "Apr 10 - Apr 17",
    price: "$2,800",
    description: "Hike across the fiery landscapes of Mustafar.",
    capacity: "4 people",
  },
  {
    id: 6,
    name: "Naboo Lakeside Retreat",
    location: "Naboo, Mid Rim",
    dates: "May 15 - May 22",
    price: "$3,500",
    description: "Relax and rejuvenate at this luxurious lakeside retreat on Naboo.",
    capacity: "2 people",
  },
]

export default function FeaturedDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 3 >= destinations.length ? 0 : prev + 3))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 3 < 0 ? Math.max(0, destinations.length - 3) : prev - 3))
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {destinations.slice(currentIndex, currentIndex + 3).map((destination) => (
          <div
            key={destination.id}
            className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2E67F8] hover:border-[#FFE81F] transition-colors"
          >
            <h3 className="text-lg font-semibold mb-2 text-[#FFE81F]">{destination.name}</h3>
            <div className="aspect-video bg-[#2C2C2C] mb-4 rounded-md border border-[#2E67F8]"></div>
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <p className="font-bold text-[#FFE81F]">{destination.price}</p>
                <div className="text-sm text-[#CCCCCC]">
                  <p>{destination.location}</p>
                  <p>{destination.dates}</p>
                </div>
              </div>
              <p className="text-white">{destination.description}</p>
              <p className="text-sm text-[#CCCCCC]">{destination.capacity}</p>
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
  )
}

