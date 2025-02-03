import React from "react";
import Header from "../features/reservation/components/Header";
import ReservationList from "../features/reservation/components/ReservationList";

// ReservationsPage Component
const ReservationsPage: React.FC = () => (
  <div>
    <Header />
    <ReservationList />
  </div>
);

export default ReservationsPage;
