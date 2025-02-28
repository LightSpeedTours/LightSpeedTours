import React from "react";
import Header from '../shared/components/OnlyHeader';
import ReservationList from "../features/reservation/components/ReservationList";

// ReservationsPage Component
export default function ReservationsPage() {
  return (
    <div>
      <Header />
      <ReservationList />
    </div>
  );
}
