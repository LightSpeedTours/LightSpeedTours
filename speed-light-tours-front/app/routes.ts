import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/comentarios","routes/CommentPage.tsx"),
  route("/landingPage","routes/LandingPage.tsx"),
  route("/touReservation","routes/touReservation.tsx"),
  route("/hotelReservation","routes/hotelReservation.tsx"),
] satisfies RouteConfig;


