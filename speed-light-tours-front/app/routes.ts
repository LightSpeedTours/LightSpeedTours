import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/comentarios","routes/CommentPage.tsx"),
  route("/landingPage","routes/LandingPage.tsx"),
  route("/touReservation","routes/TourReservationPage.tsx"),
  route("/hotelReservation","routes/HotelReservationPage.tsx"),
  route("/reservations","routes/ReservationsPage.tsx"),
  route("/profile","routes/ProfilePage.tsx"),
] satisfies RouteConfig;


